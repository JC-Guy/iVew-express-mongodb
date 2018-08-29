//该模块要封装所有对数据库的操作
var mongoose =require('mongoose')
//数据库连接
function connectDB(callback) { 
  var url="mongodb://localhost:27017/webOwnMade"
  mongoose.connect(url,function(err,db){
    callback(err,db)
  })
  mongoose.connection.on('connected', () => {
    console.log('db connected!')
  })
  mongoose.connection.on('error', () => {
    console.log('db connected error!')
  })
  mongoose.connection.on('disconnected', () => {
    console.log('db disconnected!')
  })
 }

//插入数据
exports.insertOne=function(collectionName,data,callback){
  connectDB(function (err,db) { 
    if(err){
      callback(err,db)
      return 
    }
    db.collection(collectionName).insertOne(data,function(err,result){
      callback(err,result)
    
    })
   })

}