var express = require("express");
var router = express.Router();
var Audioo = require("../models/audios");

//获得歌曲
router.get('/audioArea',(req,res)=>{
  Audioo.find({}).then(doc=>{
    res.json(doc)
  }).catch(err=>{
    console.log(err)
  })
})
//添加歌曲
router.post('/audioArea',(req,res)=>{
  Audioo.create({
    url:req.body.url,
    audioName:req.body.audioName,
    singer:req.body.singer,
    date:req.body.date
  }).then(doc=>{
    res.status(200).json(doc)
  }).catch(err=>{
    console.log(err)
  })
})

//删除歌曲（想了想，好像暂时不需要从数据里删除）
// router.delete("/audioArea", (req, res) => {
//   Audioo.remove({ _id: req.query.id })
//     .then(doc => {
//       res.json(doc);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });


module.exports=router