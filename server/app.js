var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser= require('body-parser');
var mongoose =require('mongoose')
var indexRouter = require('./routes/index');
var commentsRouter=require('./routes/comments')
// var goodsRouter = require('./routes/goods');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//配置跨域，解决’Access-Control-Allow-Origin’跨域问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由
app.use('/api', indexRouter);
app.use('/api',commentsRouter)
// app.use('/api',goodsRouter)


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
//数据库连接
var url ='mongodb://localhost:27017/webOwnMade'
mongoose.connect(url,(err)=>{
  if(err){
    console.log(err)
  }else{
    console.log('数据库连接成功！')
  }
})
//端口监听  
var port = process.env.PORT || 3001
app.listen(port)
console.log('app is listening on port: ' + port)

module.exports = app;
