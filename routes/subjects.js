var express = require('express');
var router = express.Router();

const db = require('../models');

router.get('/', function(req, res) {
  db.Subject.findAll({
    include: db.Teacher
  })
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
    where: {id: req.params.id}
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
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch((err) => {
    res.send("Error : " + err.message);
  })
})

router.get('/:id/enrolledstudents', (req, res) => {
  db.Subject.findOne({
    where: {id:req.params.id}
  })
  .then(dataSubjectByID => {
    db.Student_Subject.findAll({
      where: {SubjectId: req.params.id},
      include: db.Student,
      order: [['Student', 'first_name', 'ASC']]
    })
    .then(dataStudentBySubject => {
      res.render('subjects_enrolledstudents', {query: dataSubjectByID, query2: dataStudentBySubject})
    })
  })
})

router.get('/:id_student/givescore/:id_subject', (req,res) => {
  db.Student_Subject.findById(req.params.id_student, {
    where: { StudentId: req.params.id_student,
      $and : { SubjectId: req.params.id_subject}
  },
    include: [{all:true}]
  })
  .then(idStudent_Student_Subject => {
    console.log(idStudent_Student_Subject);
    res.render('givescore', {query: idStudent_Student_Subject})
  })
})

router.post('/:id_student/givescore/:id_subject', (req, res) => {
  db.Student_Subject.update({
    score: req.body.score
  },{
    where: { StudentId: req.params.id_student,
      $and: { SubjectId: req.params.id_subject}
    }
  })
  .then(() => {
    res.redirect('/subjects/${req.params.id_subject}/enrolledstudents')
  })
})

module.exports = router