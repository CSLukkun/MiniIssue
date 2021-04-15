var express = require('express');
var bodyParser = require("body-parser");
var session = require('express-session');
var cookieParse = require('cookie-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParse())

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "*");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "*");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
});

app.use(session({
  secret: 'chyingp', // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: true, // 是否每次都重新保存会话，建议false
  
}));

// 登录接口
app.post('/login', function(req, res){
    req.session.password = req.body.password;
    res.json(req.session)
});

// 退出登录
app.get('/getsession', function(req, res){
  console.log(req.session);
  res.send(req.session.password)
});



app.listen(3000,function(err,suc){
    console.log('http://127.0.0.1:3000/getsession')
})
