var express = require('express');
var router = express.Router();

var letterScore = require('../helpers/letterScore')

const db = require('../models');

router.use((req, res, next) => {
  if (req.session.user.role == 'academic' || req.session.user.role == 'headmaster') {
    next()
  } else {
    res.send('Anda tidak punya akses ke menu ini!, hanya academic dan headmaster yang bisa akses ke menu ini!')
  }
})

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
  db.Student_Subject.findAll({
    order: [['Student', 'first_name']],
    where: { SubjectId: req.params.id},
    include: [{all:true}]
  })
  .then((studentSubjectBySubjectId) => {
    studentSubjectBySubjectId.forEach(score => {
      score.letterScore = letterScore(score.score)
      // console.log(score);
    })
    // studentSubjectBySubjectId.str = numScoreTOstrScore()
    res.render('subjects_enrolledstudents', {query: studentSubjectBySubjectId})
  })
  .catch(err => {
    res.send("Error : " + err.message)
  })
  // db.Subject.findOne({
  //   where: {id:req.params.id}
  // })
  // .then(dataSubjectByID => {
  //   db.Student_Subject.findAll({
  //     where: {SubjectId: req.params.id},
  //     include: db.Student,
  //     order: [['Student', 'first_name', 'ASC']]
  //   })
  //   .then(dataStudentBySubject => {
  //     res.render('subjects_enrolledstudents', {query: dataSubjectByID, query2: dataStudentBySubject})
  //   })
  // })
})

router.get('/:id_subject/givescore/:id_student', (req,res) => {
  db.Student_Subject.findAll({
    where: { SubjectId: req.params.id_subject,
      $and : { StudentId: req.params.id_student}
    },
    include: [{all:true}]
  })
  .then(idStudent_Student_Subject => {
    // console.log(idStudent_Student_Subject);
    res.render('givescore', {query: idStudent_Student_Subject[0]})
  })
  .catch(err => {
    res.send("Error : " + err.message)
  })
})

router.post('/:id_subject/givescore/:id_student', (req, res) => {
  db.Student_Subject.update({
    score: req.body.score
  },{
    where: { SubjectId: req.params.id_subject,
      $and: { StudentId: req.params.id_student}
    }
  })
  .then(() => {
    // res.redirect(`/subjects/${req.params.id_subject}/enrolledstudents`)
    res.redirect('/subjects/' + req.params.id_subject + '/enrolledstudents')
  })
  .catch(err => {
    res.send("Error : " + err.message)
  })
})

module.exports = router