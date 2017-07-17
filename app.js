const express = require('express');
let app = express();

// View Engine
app.set('view engine', 'ejs');

// Public Folder for CSS, JS
app.use(express.static('public'));

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Express Session
var session = require('express-session')

app.use(session({
  secret: 'hacktiv8',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

// login-form
var login = require('./routes/login');
app.use('/', login)

// index
var index = require('./routes/index');
app.use('/index', index)

// teachers
var teachers = require('./routes/teachers');
app.use('/teachers', teachers)

// subjects
var subjects = require('./routes/subjects');
app.use('/subjects', subjects)

// students
var students = require('./routes/students');
app.use('/students', students)

app.listen(3000);