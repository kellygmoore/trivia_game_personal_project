var express = require("express");
var app = express();
var pg = require('pg');
//var bodyParser = require('body-parser');
//var passport = require('./strategies/user');
//var session = require('express-session');
//var Model = require('./models/models');
//var path = require('path');
//var register = require('./routes/register');
//var login = require('./routes/login');
var data = require('./routes/data');

//var auth = require('./modules/auth');

var index = require('./routes/index');


app.set("port", process.env.PORT || 5000);

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({expanded: true}));

//app.use(express.static(path.join(__dirname, 'public')));    //do I need this?

console.log("In server app.js");

//app.use(session({
//    secret: 'secret',
//    key: 'user',
//    resave: 'true',
//    saveUninitialized: false,
//    cookie: {maxage: 600000, secure: false}
//}));
//
//app.use(passport.initialize());
//app.use(passport.session());


//routes//////////////////
//app.use('/register', register);
//app.use('/login', login);

app.use('/data', data);
app.use('/', index);

app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});

////AUTHORIZED AREA
//app.use('/*', auth);

//all your secure paths
//app.use('/data', data);

//
//Model.User.sync({force: false}).then(function(){
//        console.log('Users table exists.');
//    app.listen(app.get("port"), function(req,res,next){
//        console.log("Listening on port: " + app.get("port"));
//    });
//});

module.exports = app;