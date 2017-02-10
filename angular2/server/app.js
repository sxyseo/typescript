'use strict';

var path = require('path');
var http = require('http');
var express = require('express');
var config = require('./config');
var routes = require('./routes');
// 注意：原来express3.x的中间件改为模块方式引入
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');
// application
var app = express();

// 中间件
app.use(cookieParser(config.authCookieSecret));
// 这里的调用需注意：`bodyParser`不能直接调用了！
// 参考：https://github.com/ar-insect/body-parser#express-route-specific
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// https://github.com/expressjs/session#cookie-options
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
// express4.x只保留了`static`中间件
// 静态资源目录
//app.use('/assets', express.static(path.join(__dirname, 'assets')));
// 图像
//app.use('/server/static', express.static(path.join(__dirname, 'public/images')));
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Cache-Control, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 路由
routes(app);

// 错误处理
if (config.debug) {
  app.use(errorhandler({ dumpExceptions: true, showStack: true }));
} else {
  app.use(function (err, req, res, next) {
    return res.status(500).send('500 status');
  });
}

// 模板引擎


// set port
app.set('port', process.env.PORT || config.port);
var port = process.argv[2];
port = /^\d{4,5}$/.test(port) ? port : app.get('port');
http.createServer(app).listen(port, function () {
  console.log('Server listening on port ' + port);
}).on('error', function (err) {
  console.log('Error', err.code);
});

module.exports = app;