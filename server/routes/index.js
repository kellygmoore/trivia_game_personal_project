var express = require('express');
var router = express.Router();
var path = require('path');
//var passport = require('passport');


//var login = require('./login');
//var register = require('./register');
//
//var auth = require('../modules/auth');
//
//router.post('/',
//    passport.authenticate('local', {
//        failureRedirect: '/assets/views/routes/login.html'
//    }),
//    function(req, res){
//        res.redirect('#category');
//    }
//);


//router.get("/*", function(req, res, next){
//    var file = req.params[0] || 'views/index.html';
//    res.sendFile(path.join(__dirname, "../public", 'views/index.html'));
//});

//
//router.use('/register', register);
//router.use('/login', login);
//
//////AUTHORIZED AREA
//router.use('/*', auth);


router.get("/", function(req,res,next){
    //var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", "/assets/views/index.html"));
});

module.exports = router;