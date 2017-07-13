const express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// index

// teachers
var teachers = require('./routes/teachers');
app.use('/teachers', teachers)




app.listen(3000);