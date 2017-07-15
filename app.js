const express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// index
var index = require('./routes/index');
app.use('/', index)

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