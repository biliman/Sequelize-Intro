var express = require('express');
var router = express.Router();

const db = require('../models');

router.get('/', function(req, res) {
  db.Teacher.findAll()
  .then((results) => {
    res.render('teachers', {teachers: results})
  })
})

// router.get('/add', function (req, res) {
//   res.render('teacher_add', {})
// })

module.exports = router