var express = require('express');
var app = express();
var fs = require('fs');
var myApp = angular.module('myApp.controllers', []);
//var file = "DaycareDB.db";
//var exists = fs.existsSync(file);
//var db = OpenDatabase(file);

app.use(express.static(__dirname + '/Project'));

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    res.sendFile('Project/Home.html', {root: __dirname });
});


app.listen(3000);
console.log("running at port 3000");