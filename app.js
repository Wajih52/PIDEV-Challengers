const express = require('express');
const { use } = require('express/lib/application');
const app = express();
const morgan= require('morgan');
const mongoose= require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());

//Routes
const usersRoutes = require('./routes/users');
const { text } = require('body-parser');


const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);



mongoose.connect(process.env.CONNECTION_STRING,
  {
      useNewUrlParser : true,
      useUnifiedTopology: true,
      dbName: 'GestionEcole'


  })
.then(()=>{
  console.log('connected ...')
})
.catch((err)=>{
console.log(err);
}) ;


app.listen(3001, ()=>{
  console.log(api);
  console.log("app running in  http://localhost:3001");
 

} )