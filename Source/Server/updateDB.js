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

//The next 3 functions; childToClass, editChildClass, and deleteChild work with the modals on the child profile pages.
//These functions exist to move children to and from classrooms as well as store departure and arrival times throughout the week.

	childToClass: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("INSERT INTO " + info.Classroom + " (ChildID, MI1, MI2, MI3, MO1, MO2, MO3, TI1, TI2, TI3, TO1, TO2, TO3, WI1, WI2, WI3, WO1, WO2, WO3, THI1, THI2, THI3, THO1, THO2, THO3, FI1, FI2, FI3, FO1, FO2, FO3) VALUES ($ChildID, $MI1, $MI2, $MI3, $MO1, $MO2, $MO3, $TI1, $TI2, $TI3, $TO1, $TO2, $TO3, $WI1, $WI2, $WI3, $WO1, $WO2, $WO3, $THI1, $THI2, $THI3, $THO1, $THO2, $THO3, $FI1, $FI2, $FI3, $FO1, $FO2, $FO3)", {
			$ChildID: info.ChildID,
			$MI1: info.MI1,
			$MI2: info.MI2,
			$MI3: info.MI3,
			$MO1: info.MO1,
			$MO2: info.MO2,
			$MO3: info.MO3,
			$TI1: info.TI1,
			$TI2: info.TI2,
			$TI3: info.TI3,
			$TO1: info.TO1,
			$TO2: info.TO2,
			$TO3: info.TO3,
			$WI1: info.WI1,
			$WI2: info.WI2,
			$WI3: info.WI3,
			$WO1: info.WO1,
			$WO2: info.WO2,
			$WO3: info.WO3,
			$THI1: info.THI1,
			$THI2: info.THI2,
			$THI3: info.THI3,
			$THO1: info.THO1,
			$THO2: info.THO2,
			$THO3: info.THO3,
			$FI1: info.FI1,
			$FI2: info.FI2,
			$FI3: info.FI3,
			$FO1: info.FO1,
			$FO2: info.FO2,
			$FO3: info.FO3
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
			
		db.run("UPDATE " + info.Classroom + " SET MI1 = $MonI1, MI2 = $MonI2, MI3 = $MonI3, MO1 = $MonO1, MO2 = $MonO2, MO3 = $MonO3, TI1 = $TuesI1, TI2 = $TuesI2, TI3 = $TuesI3, TO1 = $TuesO1, TO2 = $TuesO2, TO3 = $TuesO3, WI1 = $WednesI1, WI2 = $WednesI2, WI3 = $WednesI3, WO1 = $WednesO1, WO2 = $WednesO2, WO3 = $WednesO3, THI1 = $ThursI1, THI2 = $ThursI2, THI3 = $ThursI3, THO1 = $ThursO1, THO2 = $ThursO2, THO3 = $ThursO3, FI1 = $FriI1, FI2 = $FriI2, FI3 = $FriI3, FO1 = $FriO1, FO2 = $FriO2, FO3 = $FriO3 WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
			//$Table: info.Classroom,
			$MonI1: info.MonI1,
			$MonI2: info.MonI2,
			$MonI3: info.MonI3,
			$MonO1: info.MonO1,
			$MonO2: info.MonO2,
			$MonO3: info.MonO3,
			$TuesI1: info.TuesI1,
			$TuesI2: info.TuesI2,
			$TuesI3: info.TuesI3,
			$TuesO1: info.TuesO1,
			$TuesO2: info.TuesO2,
			$TuesO3: info.TuesO3,
			$WednesI1: info.WednesI1,
			$WednesI2: info.WednesI2,
			$WednesI3: info.WednesI3,
			$WednesO1: info.WednesO1,
			$WednesO2: info.WednesO2,
			$WednesO3: info.WednesO3,
			$ThursI1: info.ThursI1,
			$ThursI2: info.ThursI2,
			$ThursI3: info.ThursI3,
			$ThursO1: info.ThursO1,
			$ThursO2: info.ThursO2,
			$ThursO3: info.ThursO3,
			$FriI1: info.FriI1,
			$FriI2: info.FriI2,
			$FriI3: info.FriI3,
			$FriO1: info.FriO1,
			$FriO2: info.FriO2,
			$FriO3: info.FriO3
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