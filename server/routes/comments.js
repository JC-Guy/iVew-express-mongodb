var express = require("express");
var router = express.Router();
var Commentt = require("../models/comments");

//自己写评论
router.post("/comments", function(req, res) {
  var c = req.query.doRecall;
  var a = new Date().toLocaleString();
  var b = req.query.username;
  var d = req.query.id;
  if (c) {
    //是回复
    Commentt.update(
      { _id: d },
      {$push: {
        subItem: {
          cUsername: b,
          title: "",
          content: req.body.content,
          time: a
        }
      }
    }
    ).then(doc => {
      res.json(doc);
    });
  } else {
    //是评论
    Commentt.create({
      cUsername: b,
      title: req.body.title,
      content: req.body.content,
      time: a
    }).then(doc => {
      res.status(200).json(doc);
    });
  }
});
//获得评论列表
router.get("/comments", (req, res) => {
  Commentt.find({})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
    });
});
//删除评论
router.delete("/comments", (req, res) => {
  Commentt.remove({ _id: req.query.id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
