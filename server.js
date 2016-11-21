var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');
var DatabaseFunction = require('./Source/Server/test.js');
var quickstart = require('./Source/Server/quickstart.js');
var updateDB = require('./Source/Server/updateDB.js');
var profileStorage = require('./Source/Server/profileStorage.js');


var str = (__dirname + '/Source/Server/quickstart.js')
var runQuickstart = require(str);

app.use(express.static(__dirname + '/Source/Client/Templates'));

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    res.sendFile('/Source/Client/Templates/Home.html', {root: __dirname });
});

  app.get('/RefreshDatabase', function (req, res) {
    // quickstart.runQuickstart(function(err, data){
    //   if(err) {
    //     // handle the error here
    //     console.log("An error has occurred: " + err)
    //   }
    //   // send the data
    //   res.send(data);
    // })
    res.send(quickstart.runQuickstart());
  });

  app.get('/LoadWaitingList', function (req, res) {
    updateDB.callWaitingList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      res.send(data);
    })
  });

  app.post('/storeTempProfile', jsonParser, function (req, res) {
    profileStorage.storeProfile(req.body); 
    return res.sendStatus(200);
  }); 

  app.get('/getTempProfile', function (req, res) {
    profileStorage.retrieveProfile(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      res.send(data);
    })
  });

  app.post('/acceptChild', jsonParser, function (req, res) {
    updateDB.acceptChild(req.body); 
    return res.sendStatus(200);
  }); 

  app.get('/callEnrolledList', function (req, res) {
    updateDB.callEnrolledList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      res.send(data);
    })
  });


app.listen(3000);
console.log("running at port 3000");