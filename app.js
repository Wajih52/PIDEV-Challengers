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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//-----------------------Définition Route evenement------------------------------------
var evenementRouter = require('./routes/evenement');
//-------------------------------------------------------------------------------------

var app = express();
app.use(cors());
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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
