var express = require('express');
var router = express.Router();

const db = require('../models')

const crypto = require('crypto')
const hash = require('../helpers/cryptoHash')

router.get('/', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/index')
  } else {
    res.render('login')
  }
})

router.get('/login', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/index')
  // } else {
    res.render('login')
  }
})

router.post('/', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.send(`Please Enter Username and Password`)
  } else {
    db.User.findOne({
      where: { username : req.body.username}
    })
    .then(findUser => {
      // Checking Hash
      const secret = findUser.salt
      const hashData = hash(req.body.password, secret)
      
      if (hashData == findUser.password) {
        req.session.user = {
          username: findUser.username,
          role: findUser.role
        }
        if (findUser.role == 'teacher') {
          res.redirect('/students')
        } else if (findUser.role == 'academic') {
          res.redirect('/subjects')
        } else {
          res.redirect('/teachers')
        }
      } else {
        res.send('Password yang anda masukkan Salah!')
      }
    })
    .catch(err => {
      res.send('User tidak ditemukan!')
    })
  }
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/')
  })
})

router.get('/login/register', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/index')
  } else {
    res.render('login/register')
  }
})

router.post('/login/register', (req, res, next) => {
  db.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.render('login')
  })
  .catch(err => {
    res.send(err.message)
  })
})

module.exports = router