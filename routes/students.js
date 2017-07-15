var express = require('express');
var router = express.Router();

const db = require('../models');

router.get('/', (req, res) => {
  db.Student.findAll()
  .then((results) => {
    res.render('students', {students: results})
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

router.get('/add', (req,res) => {
  res.render('students_add', {error: ''})
})

router.post('/add', (req, res) => {
  db.Student.findOne({
    where: {
      email : req.body.email
    }
  })
  .then(result => {
    if (!result) {
      db.Student.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(() => {
        res.redirect('/students')
      })
      .catch(err => {
        res.render('students_add', {error: err.message})
      })
    } else {
      res.render('students_add', {error: 'Email already exists, Please use other email address, OK?'})
    }
  })
})

router.get('/edit/:id/addsubject', (req, res) => {
  db.Student.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dataStudentById => {
    db.Subject.findAll()
    .then(subjectBydataStudentId => {
      res.render('students_edit_addsubject', {query: dataStudentById, query2: subjectBydataStudentId})
    })
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

router.post('/edit/:id/addsubject', (req, res) => {
  db.Student_Subject.create({
    StudentId: req.params.id,
    SubjectId: req.body.subject,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

router.get('/edit/:id', (req,res) => {
  db.Student.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dataStudentById => {
    res.render('students_edit', {query: dataStudentById})
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

router.post('/edit/:id', (req, res)=> {
  db.Student.update({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

router.get('/delete/:id', (req,res) => {
  db.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.send("Error : " + err.message);
  })
})

module.exports = router