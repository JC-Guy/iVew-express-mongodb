var express = require('express')
var router = express.Router()
var Commentt = require('../models/comments')


router.post('/comments', function (req, res) {
  Commentt.create({
    title:req.body.title,
    content:req.body.content
  }).then((doc)=>{
    // console.log('result :'+doc)
    res.status(200).json(doc)
  })
})

router.get('/comments',(req,res)=>{
  Commentt.find({}).then((doc)=>{
      res.json(doc)
  }).catch(err=>{
    console.log(err)
  })
})
module.exports = router