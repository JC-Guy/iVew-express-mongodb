var express = require('express')
var router = express.Router()
var Goods = require('../models/goods')

router.get('/goods', function (req, res, next) {
  Goods.find({}, function (err, doc) {
    if (err) {
      res.json({
        msg: err
      })
    } else {
      res.json({
        msg: 'no err',
        result: {
          count: doc.length,
          list: doc
        }

      })
    }

  })
})

module.exports = router