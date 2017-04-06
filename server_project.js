var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var session = require('express-session');
var uuid = require("node-uuid");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(session({
    resave: false,
    saveUninitialized: true
}));

var port = process.env.PORT || 3000;
var ipaddress = process.env.IP || '127.0.0.1';


require ("./test/app.js")(app,db, mongoose);

// for services
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress, function() {
    console.log("I am here");
});


