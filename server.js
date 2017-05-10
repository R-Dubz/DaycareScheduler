var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');
var DatabaseFunction = require('./Source/Server/test.js');
var quickstart = require('./Source/Server/quickstart.js');
var updateDB = require('./Source/Server/updateDB.js');
var profileStorage = require('./Source/Server/profileStorage.js');
var fileUpload = require('express-fileupload');


var str = (__dirname + '/Source/Server/quickstart.js')
var runQuickstart = require(str);

app.use(express.static(__dirname + '/Source/Client/Templates'));

app.use(express.static(__dirname + '/'));
app.use(fileUpload());
// THIS IS THE WORKING VERSION OF SERVER.JS


  app.listen(3000, function() {
    console.log("Launch successful. To access app, open your browser and insert the following URL into your address bar: http://localhost:3000/");
     setInterval(updateDB.callUnenrolledList(function(err, data){
        if(err) {
          // print error
          console.log(err);
        }
        console.log("Checking for Unenrolled Children...");
        if(data.length < 1){
          console.log("Database is up to date. No Children Deleted");
          //Do nothing. There are no unenrolled children
        } else {
          //Check to see if children have been "idle" for 5 years (arbitrary time set by SPCCC) and delete them if they have been
          var currentDate = new Date();
          for(var counter = 0; counter < data.length; counter++){
            var unenrolledDate = new Date(data[counter].EnrollmentTerminated);
            // var unenrolledDate = new Date("5/4/2010"); Test case. 
            var difference = currentDate - unenrolledDate;
            if(difference > 157700000000){
              console.log("Over 5 years old. Delete child!");
              var child = data[counter].ChildID;
              var ID = {ChildID: child};
              updateDB.deleteChildFromDatabasePermanently(ID);
              console.log("child deleted");
            } else{
              //do nothing. array "data" was empty. There are no inactive children to delete.
            }
          }
        }
      }), 604800000); // 604800000ms = 1 week. Because Javascript uses ms. ugh.
                      // Run this function once a week and delete children inactive for 5 years or more. 
  });

app.get('/', function (req, res) {
    console.log("Loading Home Page...");
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
    // res.send(quickstart.runQuickstart());
    var callCount = 1;
    var repeater = setInterval(function () {
      if (callCount < 30) {
        quickstart.runQuickstart();
        callCount += 1;
      } else {
        clearInterval(repeater);
      }
    }, 5000);

    updateDB.callWaitingList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Refreshing Database...");
      res.send(data);
    })
  });


  app.get('/LoadWaitingList', function (req, res) {
    updateDB.callWaitingList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Loading Waiting List...");
      res.send(data);
    })
  });

  app.post('/storeTempProfile', jsonParser, function (req, res) {
    updateDB.storeProfile(req.body); 
    console.log("Storing Temp Profile...");
    return res.sendStatus(200);
  }); 

  app.get('/getTempProfile', function (req, res) {
    profileStorage.callProfileDB(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      profileStorage.retrieveProfile(data, function(err, data1){
        if(err) {
          // handle the error here
        }
        // send the data
        console.log("Sending Profile...");
        res.send(data1);
    })
    })
  });

  app.post('/acceptChild', jsonParser, function (req, res) {
    updateDB.acceptChild(req.body); 
    console.log("Accepting Child...");
    return res.sendStatus(200);
  }); 

  app.post('/terminateChild', jsonParser, function (req, res) {
    updateDB.unenrollChild(req.body); 
    console.log("Unenrolling Child...");
    return res.sendStatus(200);
  });

  app.post('/unenrollChild', jsonParser, function (req, res) {
    updateDB.unenrollChild(req.body); 
    console.log("Child is being unenrolled...");
    return res.sendStatus(200);
  }); 

  app.post('/editChildClassroom', jsonParser, function (req, res) {
    updateDB.editChildClass(req.body);
    console.log("Editing Child...");
    return res.sendStatus(200);
  });

  app.post('/deleteChildFromClassroom', jsonParser, function (req, res) {
    updateDB.deleteChild(req.body);
    console.log("Deleting Child...");
    return res.sendStatus(200);
  });

  app.post('/InsertChildToClass', jsonParser, function (req, res) {
    updateDB.childToClass(req.body); 
    console.log("Inserting Child into Classroom...");
    return res.sendStatus(200);
  }); 

    app.get('/getChildClass', jsonParser, function (req, res) {
    updateDB.callClass(req.query, function(err, data){
      if(err) {
        // handle the error here
        console.log(err);
      }
      // send the data
      console.log("Sending Classroom info for Child...");
      res.send(data);
    })
  });

  app.get('/callEnrolledList', function (req, res) {
    updateDB.callEnrolledList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Loading Enrolled List...");
      res.send(data);
    })
  });

  app.get('/loadEmployeeList', jsonParser, function (req, res) {
    updateDB.callEmployeeList(function(err, data){
      if(err) {
        // handle the error here
        console.log(err);
      }
      // send the data
      console.log("Sending employee info...");
      res.send(data);
    })
  });

  app.get('/loadEmployeeSchedule', jsonParser, function (req, res) {
    updateDB.callSchedule(function(err, data){
      if(err) {
        // handle the error here
        console.log(err);
      }
      // send the data
      console.log("Sending employee schedule info...");
      res.send(data);
    })
  });

  app.post('/test', jsonParser, function (req, res) {
    updateDB.editFromProfile(req.body); 
    console.log("Applying Profile Changes...");
    return res.sendStatus(200);
  }); 

app.post('/callAllClass', jsonParser, function (req, res) {
    updateDB.callAllClass(req.body, function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Loading Rooms List...");
      res.send(data);
    })
  });

app.post('/getChildInfo', jsonParser, function (req, res) {
    updateDB.getChildInfo(req.body, function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Loading room information...");
      res.send(data);
    })
  });

  app.post('/test', jsonParser, function (req, res) {
    updateDB.editFromProfile(req.body); 
    console.log("Applying Profile Changes...");
    return res.sendStatus(200);
  }); 

  app.post('/editEmployeeInfo', jsonParser, function (req, res) {
    updateDB.updateStaffInfo(req.body);
    console.log("Editing Employee...");
    return res.sendStatus(200);
  });

  app.post('/editEmployeeNotes', jsonParser, function (req, res) {
    updateDB.updateStaffNotes(req.body);
    console.log("Editing Employee Notes...");
    return res.sendStatus(200);
  });

  app.post('/deleteEmployee', jsonParser, function (req, res) {
    updateDB.deleteStaffInfo(req.body);
    console.log("Deleting Employee...");
    return res.sendStatus(200);
  });

 app.post('/addEmployee', jsonParser, function (req, res) {
    updateDB.insertStaffInfo(req.body); 
    console.log("Adding Employee to database...");
    return res.sendStatus(200);
  }); 

app.post('/editChildNotes', jsonParser, function (req, res) {
    updateDB.editChildProfileNotes(req.body);
    console.log("Editing Child Notes...");
    return res.sendStatus(200);
  });

  app.post('/storeTempEmployeeProfile', jsonParser, function (req, res) {
    updateDB.storeEmployeeProfile(req.body); 
    console.log("Storing Employee Profile...");
    return res.sendStatus(200);
  }); 

  app.get('/getTempEmployeeProfile', function (req, res) {
    profileStorage.callEmployeeProfileDB(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      profileStorage.retrieveEmployeeProfile(data, function(err, data1){
        if(err) {
          // handle the error here
        }
        // send the data
      updateDB.callSchedule(function(err, data2){
        if(err) {
          // handle the error here
        }
        // send the data
        console.log("Sending Profile...");
        res.send(data1);
    })
    })
    })
  });

  app.post('/InsertSchedule', jsonParser, function (req, res) {
    updateDB.insertSchedule(req.body); 
    console.log("Inserting new schedule object...");
    return res.sendStatus(200);
  }); 

  app.post('/callIndivEmployeeSchedule', jsonParser, function (req, res) {
    updateDB.callIndivEmployeeSchedule(req.body, function(err, data){
      if(err) {
        // handle the error here
        console.log(err);
      }
      // send the data
      console.log("Sending Schedule information...");
      res.send(data);
    })
  });

  app.post('/editSchedule', jsonParser, function (req, res) {
    updateDB.editSchedule(req.body);
    console.log("Editing Schedule Object...");
    return res.sendStatus(200);
  });

  app.post('/deleteSchedule', jsonParser, function (req, res) {
    updateDB.deleteSchedule(req.body);
    console.log("Deleting Schedule Object...");
    return res.sendStatus(200);
  });

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var sampleFile = req.files.sampleFile.name;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv("./Images/Stock/sampleFile", function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});