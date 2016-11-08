var express = require('express');
var app = express();
var fs = require('fs');
var test = require('./Source/Server/test.js');


var str = (__dirname + '/Source/Server/quickstart.js')
var runQuickstart = require(str);

app.use(express.static(__dirname + '/Source/Client/Templates'));

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    res.sendFile('/Source/Client/Templates/Home.html', {root: __dirname });
});

  app.get('/RefreshDatabase', function (req, res) {
    res.send(test.RefreshDatabase());
  })

  app.get('/LoadWaitingList', function (req, res) {
    res.send("Returning row data...");
  })


app.listen(3000);
console.log("running at port 3000");