var express = require('express');
var router = express.Router();

const db = require('../models')

// router.get('/', (req, res, next) => {
//   res.render('login')
// })

router.get('/', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/index')
  } else {
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
      console.log(findUser);
      if (findUser.password == req.body.password) {
        req.session.user = {
          username: req.body.username,
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

module.exports = router