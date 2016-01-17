var express = require('express');
var router = express.Router();
//var path = require('path');
var pg = require('pg');


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/inorder_game_db';

console.log('in data');


router.get('/', function(req, res){

    var triviaArray = [];

    pg.connect(connectionString, function(err, client, done){

        var query = client.query("SELECT id, category, difficulty, points, question, " +
            "ans1, ans2, ans3, ans4, ans5, sol1, sol2, sol3, sol4, sol5 FROM inordertable ORDER BY id ASC;");

        query.on('row', function(row){
            triviaArray.push(row);
        });

        query.on('end', function(){
            client.end();
            //console.log("From server app.js: ", triviaArray);
            return res.json(triviaArray);
        });

        if(err) console.log(err);

    });

});

module.exports = router;