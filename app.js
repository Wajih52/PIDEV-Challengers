var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//----------------------communiquer avec angular---------------------------------
const cors = require('cors');

//--------------------------------Configuration Bases de données -----------------------------------
require('dotenv').config();
var mongoose=require ('mongoose');
const  uri= process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri,(err,done)=>{
  if (err)
  {
    console.log(err)
  }
  if (done)
  {
    console.log("MongooDB database connection established successfully")
  }})
//------------------------------------------------------------------------------------------------------
var mongoose = require('mongoose');
var cors = require('cors')
const multer = require("multer")
const notes = require("./model/notes");
var excelToJson = require('convert-excel-to-json');
var bodyParser  = require('body-parser');  
const nodemailer = require('nodemailer');
/* const initRoutes = require("./routes"); */
mongoose.connect("mongodb+srv://gestionEcole:gestionEcole@cluster0.qvcwozh.mongodb.net/GestionEcole?retryWrites=true&w=majority",(err,done)=>
{
  if(err){
     console.log(err);
  }
  if (done){
    console.log("success");
  }
}


);



var notesRouter = require('./routes/notes');
var coursRouter = require('./routes/cours');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//-----------------------Définition Route evenement------------------------------------
var evenementRouter = require('./routes/evenement');
//-------------------------------------------------------------------------------------

var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Single file


app.use(express.json({extended: false}));






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//-------------------------------------------

//-------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//------------------------l'utilisation des Routes -----------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/evenement',evenementRouter)


app.use('/cours', coursRouter);
app.use('/notes', notesRouter);
app.post('/send-email', function (req, res) {
  var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "yoldez.dridirezgui@esprit.tn",
      pass: "goodvibes23"
    }
  });
  console.log(JSON.stringify(req.body));
  message = {
    from: "yoldez.dridirezgui@esprit.tn",
    to: "yoldez.dridirezgui@esprit.tn",
    subject: "email validation",
    text: JSON.stringify(req.body.data)
}
transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }})
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;