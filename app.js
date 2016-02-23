var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport =  require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./auth')(passport,LocalStrategy);
var login = require('./routes/login')(passport);
var routes = require('./routes/index');
var users = require('./routes/users');
var redis = require("redis");
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();
var app = express();
var db = require('./db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
                  secret: 'ssshhhhh',  
                  resave: false,
                  saveUninitialized: false,
                  cookie: { maxAge: 60000 }, //remove this life if u want the session expire after u close the browser
                  store: new redisStore({ host: 'localhost', port: 6379, client: client })
               
                }));
app.use(function(req,res,nxt){
   
      nxt();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login',login);
app.use(function(req,res,next){
      if(req.user){
            next();
      }
      else{

          res.redirect('/login');
      }
});
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;