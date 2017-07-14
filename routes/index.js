var express = require('express');
var router = express.Router();

const db = require('../models')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router