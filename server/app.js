const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const FB = require('fb');
const dbURL = 'mongodb://rezapramudhika:lXmCsLlPFuKsQH8m@rezapramudhika-shard-00-00-cik85.mongodb.net:27017,rezapramudhika-shard-00-01-cik85.mongodb.net:27017,rezapramudhika-shard-00-02-cik85.mongodb.net:27017/jepretgram?ssl=true&replicaSet=rezapramudhika-shard-0&authSource=admin';
const db = mongoose.connection;
require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

mongoose.connect(dbURL, err => {
  if (!err)
    console.log('Connected to database');
  else
    console.log('Error Connect to database');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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