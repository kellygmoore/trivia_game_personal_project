var express = require("express");
var app = express();
var pg = require('pg');

var data = require('./routes/data');
var index = require('./routes/index');

app.set("port", process.env.PORT || 5000);

app.use('/data', data);
app.use('/', index);


app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;