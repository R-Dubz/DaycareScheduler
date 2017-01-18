/*
This library holds functions to be used in order to modify the database
*/
	var updateDB = {

		// var rawData;
		// var splitData = rawData.split(','); // this is to be put into quickstart.js to prepare data for input

		inputFormToDB: function(info) {
			var fs = require("fs");
			var file = "./Source/Server/Data/DaycareDB.db";
			var exists = fs.existsSync(file);

			if (!exists) {
				throw new Error("File not Found");
			}

			var sqlite3 = require("sqlite3").verbose();
			var db = new sqlite3.Database(file);

			db.run("INSERT INTO Personal_Information (EnrollmentStatus, TimeStamp, DesiredEnrollment, ChildName, ChildHomeAddress, HomePhone, ChildBirthDate, ChildAge, ChildGender, GuardianName1, GuardianPhone1, GuardianEmail1, GuardianStatus1, GuardianName2, GuardianPhone2, GuardianEmail2, GuardianStatus2, MaritalStatus, Custody, AgeGroup, RequiredDays, DesiredTimeBlock, RegisterResponse, GrandparentsPhone, GrandparentsAddress, employment1, employment2) VALUES ('W', $TimeStamp, $DesiredEnrollment, $ChildName, $ChildHomeAddress, $HomePhone, $ChildBirthDate, $ChildAge, $ChildGender, $GuardianName1, $GuardianPhone1, $GuardianEmail1, $GuardianStatus1, $GuardianName2, $GuardianPhone2, $GuardianEmail2, $GuardianStatus2, $MaritalStatus, $Custody, $AgeGroup, $RequiredDays, $DesiredTimeBlock, $RegisterResponse, $GrandparentsPhone, $GrandparentsAddress, $employment1, $employment2)", {
				$TimeStamp: info[0],
				$DesiredEnrollment: info[1],
				$ChildName: info[2],
				$ChildHomeAddress: info[3],
				$HomePhone: info[4],
				$ChildBirthDate: info[5],
				$ChildAge: info[6],
				$ChildGender: info[7],
				$GuardianName1: info[8],
				$GuardianPhone1: info[9],
				$GuardianEmail1: info[10],
				$GuardianStatus1: info[11],
				$GuardianName2: info[12],
				$GuardianPhone2: info[13],
				$GuardianEmail2: info[14],
				$GuardianStatus2: info[15],
				$MaritalStatus: info[16],
				$Custody: info[17],
				$AgeGroup: info[18],
				$RequiredDays: info[19],
				$DesiredTimeBlock: info[20],
				$RegisterResponse: info[21],
				$GrandparentsPhone: info[22],
				$GrandparentsAddress: info[23],
				$employment1: info[24],
				$employment2: info[25]
			});

			db.close();
		},

	callWaitingList : function(callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT ChildID, ChildName, ChildBirthdate, HomePhone, GuardianName1, GuardianStatus1, GuardianName2, GuardianStatus2, TimeStamp, DesiredEnrollment, AgeGroup, RequiredDays FROM Personal_Information WHERE EnrollmentStatus = 'W'", 
				function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

    storeProfile: function(child){

		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("UPDATE CurrentProfile SET ProfileID = $ProfileID WHERE RowID = 1", {
			$ProfileID: child.ChildID	
		});
		
		db.close();
    },


	editFromProfile: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("UPDATE Personal_Information SET EnrollmentStatus = $EnrollmentStatus, TimeStamp = $TimeStamp, DesiredEnrollment = $DesiredEnrollment, ChildName = $ChildName, ChildHomeAddress = $ChildHomeAddress, HomePhone = $HomePhone, ChildBirthdate = $ChildBirthdate, ChildAge = $ChildAge, ChildGender = $ChildGender, GuardianName1 = $GuardianName1, GuardianPhone1 = $GuardianPhone1, GuardianEmail1 = $GuardianEmail1, GuardianStatus1 = $GuardianStatus1, GuardianName2 = $GuardianName2, GuardianPhone2 = $GuardianPhone2, GuardianEmail2 = $GuardianEmail2, GuardianStatus2 = $GuardianStatus2, MaritalStatus = $MaritalStatus, Custody = $Custody, AgeGroup = $AgeGroup, RequiredDays = $RequiredDays, DesiredTimeBlock = $DesiredTimeBlock, RegisterResponse = $RegisterResponse, GrandparentsPhone = $GrandparentsPhone, GrandparentsAddress = $GrandparentsAddress, employment1 = $employment1, employment2 = $employment2 WHERE ChildID = $ChildID", {
			$EnrollmentStatus: info[0].EnrollmentStatus,
			$ChildID: info[0].ChildID,
			$TimeStamp: info[0].TimeStamp,
			$DesiredEnrollment: info[0].DesiredEnrollment,
			$ChildName: info[0].ChildName,
			$ChildHomeAddress: info[0].ChildHomeAddress,
			$HomePhone: info[0].HomePhone,
			$ChildBirthdate: info[0].ChildBirthdate,
			$ChildAge: info[0].ChildAge,
			$ChildGender: info[0].ChildGender,
			$GuardianName1: info[0].GuardianName1,
			$GuardianPhone1: info[0].GuardianPhone1,
			$GuardianEmail1: info[0].GuardianEmail1,
			$GuardianStatus1: info[0].GuardianStatus1,
			$GuardianName2: info[0].GuardianName2,
			$GuardianPhone2: info[0].GuardianPhone2,
			$GuardianEmail2: info[0].GuardianEmail2,
			$GuardianStatus2: info[0].GuardianStatus2,
			$MaritalStatus: info[0].MaritalStatus,
			$Custody: info[0].Custody,
			$AgeGroup: info[0].AgeGroup,
			$RequiredDays: info[0].RequiredDays,
			$DesiredTimeBlock: info[0].DesiredTimeBlock,
			$RegisterResponse: info[0].RegisterResponse,
			$GrandparentsPhone: info[0].GrandparentsPhone,
			$GrandparentsAddress: info[0].GrandparentsAddress,
			$employment1: info[0].employment1,
			$employment2: info[0].employment2
			
		});
		
		db.close();
	},

	acceptChild: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("UPDATE Personal_Information SET EnrollmentStatus = 'E', Classroom = '" + info[1] + "'  WHERE ChildID = $ChildID", {
			$ChildID: info[0],
		});

		db.close();
	},

	callEnrolledList : function(callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT ChildID, ChildName, ChildBirthdate, Classroom, HomePhone, GuardianName1, GuardianStatus1, GuardianName2, GuardianStatus2, TimeStamp, DesiredEnrollment, AgeGroup, RequiredDays FROM Personal_Information WHERE EnrollmentStatus = 'E'", function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

	callProfile : function(info, callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM Personal_Information WHERE ChildID = $ChildID", {$ChildID: info[0].ProfileID},
		 function(err, row) {
			$ChildID = info[0].ProfileID;
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

	callClass : function(info, callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM " + info.Classroom + " WHERE ChildID = $ChildID", {$ChildID: info.ID},
		 function(err, row) {
			$ChildID = info.ID;
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

	callAllClass : function(info, callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM " + info.Classroom, {$ChildID: info.ID},
		 function(err, row) {
			//$ChildID = info.ID;
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

//Next 3 Functions need to be fixed for correct variable names as well as add inputs to the functions.

	childToClass: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("INSERT INTO " + info.Classroom + " (ChildID, MI1, MO1, TI1, TO1, WI1, WO1, ThI1, ThO1, FI1, FO1) VALUES ($ChildID, $MI1, $MO1, $TI1, $TO1, $WI1, $WO1, $ThI1, $ThO1, $FI1, $FO1)", {
			$ChildID: info.ChildID,
			$MI1: info.MI1,
			$MO1: info.MO1,
			$TI1: info.TI1,
			$TO1: info.TO1,
			$WI1: info.WI1,
			$WO1: info.WO1,
			$ThI1: info.ThI1,
			$ThO1: info.ThO1,
			$FI1: info.FI1,
			$FO1: info.FO1
		});

		db.run("UPDATE Personal_Information SET Classroom = '" + info.Classroom + "' WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
		});
		
		db.close();
	},

	editChildClass: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("UPDATE " + info.Classroom + " SET MonI1 = $MonI1, MonO1 = $MonO1, TuesI1 = $TuesI1, TuesO1 = $TuesO1, WednesI1 = $WednesI1, WednesO1 = $WednesO1, ThursI1 = $ThursI1, ThursO1 = $ThursO1, FriI1 = $FriI1, FriO1 = $FriO1 WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
			//$Table: info.Classroom,
			$MonI1: info.MonI1,
			$MonO1: info.MonO1,
			$TuesI1: info.TuesI1,
			$TuesO1: info.TuesO1,
			$WednesI1: info.WednesI1,
			$WednesO1: info.WednesO1,
			$ThursI1: info.ThursI1,
			$ThursO1: info.ThursO1,
			$FriI1: info.FriI1,
			$FriO1: info.FriO1
		});
		
		db.close();
	},

	deleteChild: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("DELETE FROM " + info.oldClassroom + " WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
		});

		db.run("UPDATE Personal_Information SET Classroom = '' WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
		});
		
		db.close();
	},
};

	module.exports = updateDB;