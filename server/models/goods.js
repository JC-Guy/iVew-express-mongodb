var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var productSchema=new Schema({
  "productID":String,
  "productName":String,
  "productPrice":Number
})
module.exports=mongoose.model('Good',productSchema)