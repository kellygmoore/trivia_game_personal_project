//var express = require('express');
//var router = express.Router();
//var passport = require('passport');
//var path = require('path');
//var Model = require('../models/models');
//var bcrypt = require('bcrypt');
//
//
//
//router.post('/', function(req,res,next) {
//    console.log("Post: In register.js in router.js");
//    var player = req.body;
//
//    var salt = bcrypt.genSaltSync(10);
//    var hashedPassword = bcrypt.hashSync(player.password, salt);
//
//    var newUser = {
//        username: player.username,
//        firstname: player.firstname,
//        lastname: player.lastname,
//        email: player.email,
//        salt: salt,
//        password: hashedPassword
//    };
//
//    console.log("New User: ", newUser);
//
//    Model.User.create(newUser).then(function () {
//        console.log("OK registration.");
//        res.redirect('/#start')
//    }).catch(function (error) {
//        console.log("Error in registration: ", error);
//        res.redirect('/')
//    });
//
//});
//
//router.get('/', function (req, res, next){
//    console.log("Get: In register.js in router.get");
//    res.sendFile(path.resolve(__dirname, '../public/assets/views/routes/register.html'));
//});
//
//module.exports = router;