var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/inorder_game_db';

router.post('/',
    passport.authenticate('local', {
        failureRedirect: '/assets/views/routes/login.html'
    }),
    function(req, res){
        console.log("Post: In login.js in router.post authenticate ok function");
            res.redirect('/#category');
    }
);

router.get("/", function(req, res, next){
    console.log("Get: In login.js in router.get");
    res.sendFile(path.join(__dirname, "../public", '/assets/views/routes/login.html'));
});


module.exports = router;