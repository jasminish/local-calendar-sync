var express = require('express');
var app = express();
var path = require('path');
require('dotenv').config();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({secret: 'secret'}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

require('./app/routes.js')(app);

app.listen(3007, function () {
    console.log('Example app listening on port 3007!');
    console.log('http://localhost:3007/');
});