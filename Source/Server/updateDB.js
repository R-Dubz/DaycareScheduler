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

			db.run("INSERT INTO Personal_Information (EnrollmentStatus, TimeStamp, DesiredEnrollment, ChildName, ChildHomeAddress, HomePhone, ChildBirthDate, ChildAge, ChildGender, GaurdianName1, GaurdianPhone1, GaurdianEmail1, GaurdianStatus1, GaurdianName2, GaurdianPhone2, GaurdianEmail2, GaurdianStatus2, MaritalStatus, Custody, AgeGroup, RequiredDays, DesiredTimeBlock, RegisterResponse, GrandparentsPhone, GrandparentsAddress, employment1, employment2) VALUES ('W', $TimeStamp, $DesiredEnrollment, $ChildName, $ChildHomeAddress, $HomePhone, $ChildBirthDate, $ChildAge, $ChildGender, $GaurdianName1, $GaurdianPhone1, $GaurdianEmail1, $GaurdianStatus1, $GaurdianName2, $GaurdianPhone2, $GaurdianEmail2, $GaurdianStatus2, $MaritalStatus, $Custody, $AgeGroup, $RequiredDays, $DesiredTimeBlock, $RegisterResponse, $GrandparentsPhone, $GrandparentsAddress, $employment1, $employment2)", {
				$TimeStamp: info[0],
				$DesiredEnrollment: info[1],
				$ChildName: info[2],
				$ChildHomeAddress: info[3],
				$HomePhone: info[4],
				$ChildBirthDate: info[5],
				$ChildAge: info[6],
				$ChildGender: info[7],
				$GaurdianName1: info[8],
				$GaurdianPhone1: info[9],
				$GaurdianEmail1: info[10],
				$GaurdianStatus1: info[11],
				$GaurdianName2: info[12],
				$GaurdianPhone2: info[13],
				$GaurdianEmail2: info[14],
				$GaurdianStatus2: info[15],
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

		db.all("SELECT ChildName, ChildBirthdate, HomePhone, GaurdianName1, GaurdianStatus1, GaurdianName2, GaurdianStatus2, TimeStamp, DesiredEnrollment, AgeGroup, RequiredDays FROM Personal_Information WHERE EnrollmentStatus = 'W'", 
				function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
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
			
		db.run("UPDATE Personal_Information SET EnrollmentStatus = $EnrollmentStatus, TimeStamp = $TimeStamp, DesiredEnrollment = $DesiredEnrollment, ChildName = $ChildName, ChildHomeAddress = $ChildHomeAddress, HomePhone = $HomePhone, ChildBirthDate = $ChildBirthDate, ChildAge = $ChildAge, ChildGender = $ChildGender, GaurdianName1 = $GaurdianName1, GaurdianPhone1 = $GaurdianPhone1, GaurdianEmail1 = $GaurdianEmail1, GaurdianStatus1 = GaurdianStatus1, GaurdianName2 = $GaurdianName2, GaurdianPhone2 = $GaurdianPhone2, GaurdianEmail2 = $GaurdianEmail2, GaurdianStatus2 = $GaurdianStatus2, MaritalStatus = $MaritalStatus, Custody = $Custody, AgeGroup = $AgeGroup, RequiredDays = $RequiredDays, DesiredTimeBlock = $DesiredTimeBlock, RegisterResponse = $RegisterResponse, GrandparentsPhone = $GrandparentsPhone, GrandparentsAddress = $GrandparentsAddress, employment1 = $employment1, employment2 = $employment2 WHERE ChildID = $ChildID", {
			$ChildID: info[26],
			$TimeStamp: info[0],
			$DesiredEnrollment: info[1],
			$ChildName: info[2],
			$ChildHomeAddress: info[3],
			$HomePhone: info[4],
			$ChildBirthDate: info[5],
			$ChildAge: info[6],
			$ChildGender: info[7],
			$GaurdianName1: info[8],
			$GaurdianPhone1: info[9],
			$GaurdianEmail1: info[10],
			$GaurdianStatus1: info[11],
			$GaurdianName2: info[12],
			$GaurdianPhone2: info[13],
			$GaurdianEmail2: info[14],
			$GaurdianStatus2: info[15],
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

	acceptChild: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("UPDATE Personal_Information SET EnrollmentStatus = 'E' WHERE ChildID = $ChildID", {
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

		db.all("SELECT * FROM Personal_Information WHERE EnrollmentStatus = 'E'", function(err, row) {
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

		db.all("SELECT * FROM Personal_Information WHERE ChildID = $ChildID", {$ChildID: info.ChildID},
		 function(err, row) {
			$ChildID = info[0];
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},
};

	module.exports = updateDB;