var express = require('express');
var router = express.Router();

const db = require('../models');

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

router.get('/', function(req, res) {
  // teacher.findAll({
  //   res.render('teachers.ejs', {})
  // })
  db.Teacher.findAll()
  .then((results) => {
    res.render('teachers', {teachers: results})
  })
})

module.exports = router