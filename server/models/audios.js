var mongoose=require('mongoose')

var audioSchema=new mongoose.Schema({
  url:String,
  audioName:String,
  singer:String,
  date:String
})
module.exports=mongoose.model('Audio',audioSchema)