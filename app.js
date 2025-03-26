var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicycleRouter = require('./routes/bicycle');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicycle', bicycleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = createError(404, 'Not Found');
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    // determine the environment
    const isDevelopment = req.app.get('env') === 'development';

    // create the JSON response
    res.status(err.status || 500).json({
        type: 'error',
        status: err.status || 500,
        message: err.message,
        stack: isDevelopment ? err.stack : undefined, // Include stack trace only in development
        error: isDevelopment ? err : {},             // Optional extended error
    });
});

module.exports = app;
