var express = require('express');
var router = express.Router();

const db = require('../models');

router.get('/', function(req, res) {
  db.Subject.findAll()
  .then((results) => {
    res.render('subjects', {subjects: results})
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

router.get('/add', function(req, res) {
  res.render('subjects_add', {})
})

router.post('/add', function(req, res) {
  db.Subject.create({
    subject_name: req.body.subject,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch((err) => {
    res.redirect('/add')
  })
})

router.get('/edit/:id', function(req, res) {
  db.Subject.findById(req.params.id)
  .then((dataSubjectByID) => {
    res.render('subjects_edit', {subject: dataSubjectByID})
  })
})

router.post('/edit/:id', function(req,res) {
  db.Subject.update({
    subject_name: req.body.subject,
    updatedAt: new Date()
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch((err) => {
    res.send("Error : " + err.message);
  })
})

router.get('/delete/:id', function(req, res) {
  db.Subject.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch((err) => {
    res.send("Error : " + err.message);
  })
})

module.exports = router