var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var routes = require('./routes/index');
var account = require('./routes/account');
var add = require('./routes/add');
var del = require('./routes/del');
var detail = require('./routes/detail');
var doWhat = require('./routes/doWhat');
var check = require('./routes/check');
var result = require('./routes/result');

var app = express();

//connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/haircut');
//session
var session = require("express-session");
var store = new session({
  url: "mongodb://localhost/session",
  interval: 120000,
  name: 'sid',
  secret: 'recommand', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: null }, //{ maxAge: 10*60 * 1000 },
  resave:true,
  saveUninitialized:true
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//使用静态资源

app.use(store);



app.use('/index', routes);
//登录拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/" && !req.session.user) {
        req.session.error='请先登陆';
        return res.redirect("/");
    }
    next();
});
//在use前面先 用户登陆检查
//用all拦截所有访问‘/’的请求
// app.all('/', notAuthentication);
app.use('/', login);

app.use('/account', account);

app.use('/check', check);
app.use('/result', result);

//在use前面先 用户登陆检查
//用get拦截所有访问'/login'的请求
//app.get('/add',authentication);
app.use('/add', add);
// app.get('/del',authentication);
app.use('/del', del);
// app.get('/detail',authentication);
app.use('/detail', detail);
// app.get('/doWhat',authentication);
app.use('/doWhat', doWhat);

//用于页面控制
function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error='请先登陆';
    return res.redirect('/');
  }
  next();
}
function notAuthentication(req, res, next) {
  if (req.session.user) {
    req.session.error='已登陆';
    return res.redirect('index');
  }
  next();
  //前往下一个中间件请求，下一个放方法
}




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
