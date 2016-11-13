var express = require('express');
var app = express();
var fs = require('fs');
var DatabaseFunction = require('./Source/Server/test.js');
var quickstart = require('./Source/Server/quickstart.js');
var updateDB = require('./Source/Server/updateDB.js');


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


app.listen(3000);
console.log("running at port 3000");