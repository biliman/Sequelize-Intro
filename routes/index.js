var express = require('express');
var router = express.Router();

const db = require('../models')

router.get('/', (req, res, next) => {
  res.render('index')
})

// router.post('/', (req, res, next) => {
//   res.render('index')
// })

module.exports = router