var express = require('express');
var router = express.Router();

const db = require('../models');

router.get('/', function(req, res) {
  db.Teacher.findAll({
    include: db.Subject
  })
  .then((results) => {
    // console.log(results);
    res.render('teachers', {query: results})
    // res.send(results)
  })
})

router.get('/add', (req, res) => {
  res.render('teachers_add', {})
})

router.post('/add', (req, res) => {
  db.Teacher.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname, 
    email: req.body.email, 
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then((results)=> {
    res.redirect('/teachers')
    // res.send(results)    
  })
})

router.get('/edit/:id', (req, res) => {
  db.Teacher.findById(req.params.id, {include: db.Subject})
  .then((teacherJoinSubject) => {
    // console.log(teacherJoinSubject);
    db.Subject.findAll()
    .then(subjectsData => {
      res.render('teachers_edit', {query: teacherJoinSubject, query2: subjectsData})
    })
  })
  .catch(err => {
    res.send("Error : " + err.message)
  })
})

router.post('/edit/:id', (req, res) => {
  db.Teacher.update({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    SubjectId: req.body.subject,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })  
})

router.get('/delete/:id', (req, res) => {
  db.Teacher.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

module.exports = router