var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');

var passport = require('passport');
var session = require('express-session');

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/formmaker';
//var connectionString = 'mongodb://127.0.0.1:27017/prismaticmusic';

var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

// Our assignment server
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);

var db = mongoose.connect(connectionString);

//app.set('view engine', 'ejs');

//console.log("secret");
//console.log(process.env.PASSPORT_SECRET);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());

app.use(session({ secret: process.env.SESSION_SECRET , //'medhavi',
    resave : true,
    saveUninitialized : true}));

app.use(passport.initialize());
app.use(passport.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

// for services
require("./public/assignment/server/app.js")(app, db, mongoose);
//require("./public/project/server/app.js")(app);
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress, function() {
    console.log("Using ", connectionString);
    console.log("May the Force be with you!!");
 });

