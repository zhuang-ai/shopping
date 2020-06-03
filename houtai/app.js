var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require("./util/jwt")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goods = require('./routes/goods');
var app = express();
app.all("*",function (req,res,next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","*");
    if(req.method.toLowerCase() == 'options'){
        res.send(200);//让options尝试请求快速结束
    }else{
        next();
    }
});
/**
 * 前置拦截器，用来拦截所有的请求,打印请求信息
 */
app.use(function(req, res, next){
    let path = req.path;
    let type = req.method.toLowerCase();
    console.log(`请求地址：${path}`);
    console.log(`请求类型：${type}`);
    if (type === 'post') {
        console.log(`请求参数：${JSON.stringify(req.body)}`);
    } else if (type === 'get') {
        console.log(`请求参数：${JSON.stringify(req.query)}`);
    }
    next();
})
app.use(function(req, res, next){
    let reqPath = req.path;
    if (reqPath.startsWith('/users') || reqPath.startsWith('/article')) {
        if (reqPath !== '/users/login' && reqPath !== '/users/register') {
            let token = req.headers.token;
            jwt.verify(token,global.jwtKey,function(user){
                req.headers.sessionData = user;
                // console.log(`[app-request]${tools.getDate19()}-当前用户：${JSON.stringify(user)}`);
                next();
            },function(err){
                res.send('会话已过期，请重新登录');
            })
        } else {
            next();
        }
    } else {
        next();
    }

})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
    res.status(500);
    res.send(err.message)
});
//将密钥挂载到全局
global.jwtKey = '123456';
module.exports = app
