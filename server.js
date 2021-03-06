
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');

var passport = require('passport');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var connectionString = 'mongodb://127.0.0.1:27017/test';

//console.log(process.env);
if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var db = mongoose.connect(connectionString);

//app.set('view engine', 'ejs');

//console.log("secret");
//console.log(process.env.PASSPORT_SECRET);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: "harsh" ,
    resave : true,
    saveUninitialized : true}));

app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

// for services
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port)