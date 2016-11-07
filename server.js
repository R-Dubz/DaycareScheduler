var express = require('express');
var app = express();
var fs = require('fs');
//var nosql = require('nosql');
//var file = "DaycareDB.db";
//var exists = fs.existsSync(file);
//var db = OpenDatabase(file);

app.use(express.static(__dirname + '/Source/Client/Templates'));

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    res.sendFile('/Source/Client/Templates/Home.html', {root: __dirname });
});

app.get('/ThisIsATest', function (req, res) {
  res.send('YOU HAVE SUCCEEDED! HTTP REQUEST RECEIVED!')
})


app.listen(3000);
console.log("running at port 3000");