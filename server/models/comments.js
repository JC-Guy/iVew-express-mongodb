// 不支持ES6语法，不要用import
var mongoose= require('mongoose')

var commentSchema=new mongoose.Schema({
  title:String,
  content:String,

})
//数据库集合要加s，如果没有因为对应数据库集合的时候，是默认第一个参数加s之后再去匹配数据库的
//如果这里的模型和数据库集合名字不匹配，那么这个模型接受第三个参数，就是数据库的名字！！！！
module.exports=mongoose.model('Comment',commentSchema)