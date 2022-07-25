var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Schema =mongoose.Schema;

var cors = require('cors');

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
 
var Absences =new Schema({
    
})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var absenceRouter = require('./routes/absences');
var pieceRouter = require('./routes/pieces');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/absences', absenceRouter);

app.use('/pieces', pieceRouter);

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
