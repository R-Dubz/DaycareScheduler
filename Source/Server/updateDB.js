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

		db.all("SELECT ChildID, ChildName, ChildBirthdate, EnrollmentStatus, HomePhone, GuardianName1, GuardianStatus1, GuardianName2, GuardianStatus2, TimeStamp, DesiredEnrollment, AgeGroup, RequiredDays FROM Personal_Information WHERE EnrollmentStatus = 'W' OR EnrollmentStatus = 'U'", 
				function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

	callUnenrolledList : function(callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM Personal_Information WHERE EnrollmentStatus = 'U'", 
				function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});
		db.close();
	},

	callEmployeeList : function(callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM Staff_Information", 
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

	storeEmployeeProfile: function(employee){

		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("UPDATE CurrentProfile SET EmployeeID = $EmployeeID WHERE RowID = 1", {
			$EmployeeID: employee.StaffID	
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
			
		db.run("UPDATE Personal_Information SET EnrollmentStatus = $EnrollmentStatus, TimeStamp = $TimeStamp, DesiredEnrollment = $DesiredEnrollment, ChildName = $ChildName, ChildHomeAddress = $ChildHomeAddress, HomePhone = $HomePhone, ChildBirthdate = $ChildBirthdate, ChildAge = $ChildAge, ChildGender = $ChildGender, GuardianName1 = $GuardianName1, GuardianPhone1 = $GuardianPhone1, GuardianEmail1 = $GuardianEmail1, GuardianStatus1 = $GuardianStatus1, GuardianName2 = $GuardianName2, GuardianPhone2 = $GuardianPhone2, GuardianEmail2 = $GuardianEmail2, GuardianStatus2 = $GuardianStatus2, MaritalStatus = $MaritalStatus, Custody = $Custody, AgeGroup = $AgeGroup, RequiredDays = $RequiredDays, DesiredTimeBlock = $DesiredTimeBlock, RegisterResponse = $RegisterResponse, GrandparentsPhone = $GrandparentsPhone, GrandparentsAddress = $GrandparentsAddress, employment1 = $employment1, employment2 = $employment2, TimeStamp = $TimeStamp WHERE ChildID = $ChildID", {
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
			$employment2: info[0].employment2,
			$TimeStamp: info[0].TimeStamp,
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

	unenrollChild: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		var todayDate = new Date();
		var currentDate = todayDate.getMonth()+1 + "/" + todayDate.getDate() + "/" +  todayDate.getFullYear(); // For some reason Date was being misformatted between when it got sent to the server and when it arrived

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("UPDATE Personal_Information SET EnrollmentStatus = 'U', EnrollmentTerminated = '" + currentDate + "', TimeStamp = '" + currentDate + "' WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
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

		db.all("SELECT * FROM " + info.Classroom,
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

	getChildInfo : function(info, callback){
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
			$ChildID = info.ChildID;
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
			
		db.run("UPDATE " + info.Classroom + " SET MI1 = $MI1, MI2 = $MI2, MI3 = $MI3, MO1 = $MO1, MO2 = $MO2, MO3 = $MO3, TI1 = $TI1, TI2 = $TI2, TI3 = $TI3, TO1 = $TO1, TO2 = $TO2, TO3 = $TO3, WI1 = $WI1, WI2 = $WI2, WI3 = $WI3, WO1 = $WO1, WO2 = $WO2, WO3 = $WO3, THI1 = $THI1, THI2 = $THI2, THI3 = $THI3, THO1 = $THO1, THO2 = $THO2, THO3 = $THO3, FI1 = $FI1, FI2 = $FI2, FI3 = $FI3, FO1 = $FO1, FO2 = $FO2, FO3 = $FO3 WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
			//$Table: info.Classroom,
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

	deleteChildFromDatabasePermanently: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("DELETE FROM Personal_Information WHERE ChildID = $ChildID", {
			$ChildID: info.ChildID,
		});
		
		db.close();
	},

	// deleteChild: function(info) {
	// 	var fs = require("fs");
	// 	var file = "./Source/Server/Data/DaycareDB.db";
	// 	var exists = fs.existsSync(file);

	// 	if (!exists) {
	// 		throw new Error("File not Found");
	// 	}

	// 	var sqlite3 = require("sqlite3").verbose();
	// 	var db = new sqlite3.Database(file);
			
	// 	db.run("DELETE FROM " + info.oldClassroom + " WHERE ChildID = $ChildID", {
	// 		$ChildID: info.ChildID,
	// 	});
		
	// 	db.close();
	// },


// These functions INSERT, EDIT, and DELETE information from the staff table in the database.

	insertStaffInfo: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("INSERT INTO Staff_Information (LastName, FirstName, DateOfHire, PhoneNumber, PhoneNumber2, EmailAddress, MondayIn, MondayOut, MondayIn2, MondayOut2, MondayIn3, MondayOut3, TuesdayIn, TuesdayOut, TuesdayIn2, TuesdayOut2, TuesdayIn3, TuesdayOut3, WednesdayIn, WednesdayOut, WednesdayIn2, WednesdayOut2, WednesdayIn3, WednesdayOut3, ThursdayIn, ThursdayOut, ThursdayIn2, ThursdayOut2, ThursdayIn3, ThursdayOut3, FridayIn, FridayOut, FridayIn2, FridayOut2, FridayIn3, FridayOut3, MoreInfo, DateOfTermination) VALUES ($LastName, $FirstName, $DateOfHire, $PhoneNumber, $PhoneNumber2, $EmailAddress, $MondayIn1, $MondayOut1, $MondayIn2, $MondayOut2, $MondayIn3, $MondayOut3, $TuesdayIn1, $TuesdayOut1, $TuesdayIn2, $TuesdayOut2, $TuesdayIn3, $TuesdayOut3, $WednesdayIn1, $WednesdayOut1, $WednesdayIn2, $WednesdayOut2, $WednesdayIn3, $WednesdayOut3, $ThursdayIn1, $ThursdayOut1, $ThursdayIn2, $ThursdayOut2, $ThursdayIn3, $ThursdayOut3, $FridayIn1, $FridayOut1, $FridayIn2, $FridayOut2, $FridayIn3, $FridayOut3, $MoreInfo, $DateOfTermination)", {
		// db.run("INSERT INTO Staff_Information (LastName, FirstName, PhoneNumber, PhoneNumber2, EmailAddress) VALUES ($LastName, $FirstName, $PhoneNumber, $PhoneNumber2, $EmailAddress)", {
			$LastName: info.LastName,
			$FirstName: info.FirstName,
			$DateOfHire: info.DateOfHire,
			$PhoneNumber: info.PhoneNumber,
			$PhoneNumber2: info.PhoneNumber2,
			$EmailAddress: info.EmailAddress,
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
			$FO3: info.FO3,
			// $MoreInfo: info.MoreInfo,
			// $DateOfTermination: info.DateOfTermination,
		});
		db.close();
	},

	updateStaffInfo: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("UPDATE Staff_Information SET LastName = $LastName, FirstName = $FirstName, DateOfHire = $DateOfHire, PhoneNumber = $PhoneNumber, PhoneNumber2 = $PhoneNumber2, EmailAddress = $EmailAddress, MI1 = $MI1, MI2 = $MI2, MI3 = $MI3, MO1 = $MO1, MO2 = $MO2, MO3 = $MO3, TI1 = $TI1, TI2 = $TI2, TI3 = $TI3, TO1 = $TO1, TO2 = $TO2, TO3 = $TO3, WI1 = $WI1, WI2 = $WI2, WI3 = $WI3, WO1 = $WO1, WO2 = $WO2, WO3 = $WO3, THI1 = $THI1, THI2 = $THI2, THI3 = $THI3, THO1 = $THO1, THO2 = $THO2, THO3 = $THO3, FI1 = $FI1, FI2 = $FI2, FI3 = $FI3, FO1 = $FO1, FO2 = $FO2, FO3 = $FO3, MoreInfo = $MoreInfo, DateOfTermination = $DateOfTermination WHERE StaffID = $StaffID", {
		// db.run("UPDATE Staff_Information SET LastName = $LastName, FirstName = $FirstName, PhoneNumber = $PhoneNumber, PhoneNumber2 = $PhoneNumber2, EmailAddress = $EmailAddress WHERE StaffID = $StaffID", {
			$LastName: info.LastName,
			$FirstName: info.FirstName,
			// $DateOfHire: info.DateOfHire,
			$PhoneNumber: info.PhoneNumber,
			$PhoneNumber2: info.PhoneNumber2,
			$EmailAddress: info.EmailAddress,
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
			$FO3: info.FO3,
			// $MoreInfo: info.MoreInfo,
			// $DateOfTermination: info.DateOfTermination,
			$StaffID: info.StaffID,
		});
		db.close();
	},

	updateStaffNotes: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("UPDATE Staff_Information SET MoreInfo = $MoreInfo WHERE StaffID = $StaffID", {
			$MoreInfo: info.MoreInfo,
			$StaffID: info.StaffID
		});
		db.close();
	},

	

	deleteStaffInfo: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("DELETE FROM Staff_Information WHERE StaffID = $StaffID", {
			$StaffID: info.StaffID,
		});
		
		db.close();
	},

	editChildProfileNotes: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("UPDATE Personal_Information SET ChildNotes = $ChildNotes WHERE ChildID = $ChildID", {
			$ChildNotes: info.ChildNotes,
			$ChildID: info.ChildID,
		});
		
		db.close();
	},

	callEmployeeProfile : function(info, callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM Staff_Information WHERE StaffID = $StaffID", {$StaffID: info[0].EmployeeID},
		 function(err, row) {
			$StaffID = info[0].EmployeeID;
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

	insertSchedule: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("INSERT INTO Employee_Schedule (StaffID, Date, Classroom, TimeStart, TimeEnd, Staff_Name) VALUES ($StaffID, $Date, $Classroom, $TimeStart, $TimeEnd, $Staff_Name)", {
			$StaffID: info.StaffID,
			$Date: info.Date,
			$Classroom: info.Classroom,
			$TimeStart: info.TimeStart,
			$TimeEnd: info.TimeEnd,
			$Staff_Name: info.Staff_Name,
		});
		db.close();
	},

	deleteSchedule: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
 
		db.run("DELETE FROM Employee_Schedule WHERE ScheduleID = $ScheduleID", {
			$ScheduleID: info.ScheduleID,
		});
		
		db.close();
	},

	editSchedule: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
			
		db.run("UPDATE Employee_Schedule SET StaffID = $StaffID, Date = $Date, Classroom = $Classroom, TimeStart = $TimeStart, TimeEnd = $TimeEnd, Staff_Name = $Staff_Name WHERE ScheduleID = $ScheduleID", {
			$StaffID: info.StaffID,
			$Date: info.Date,
			$Classroom: info.Classroom,
			$TimeStart: info.TimeStart,
			$TimeEnd: info.TimeEnd,
			$Staff_Name: info.Staff_Name,
			$ScheduleID: info.ScheduleID,
		});
		
		db.close();
	},

	callSchedule : function(callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM Employee_Schedule", 
				function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},


	callIndivEmployeeSchedule : function(info, callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM Employee_Schedule WHERE StaffID = $StaffID", {$StaffID: info.StaffID},
		 function(err, row) {
			$StaffID = info.StaffID;
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
	},

	editEmployeePhoto: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("UPDATE Staff_Information SET EmployeePhoto = $EmployeePhoto WHERE StaffID = $StaffID", {
			$EmployeePhoto: info.EmployeePhoto,
			$StaffID: info.StaffID,
		});
		db.close();
	},

	editChildPhoto: function(info) {
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);

		if (!exists) {
			throw new Error("File not Found");
		}

		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.run("UPDATE Personal_Information SET ChildPhoto = $ChildPhoto WHERE ChildID = $ChildID", {
			$ChildPhoto: info.ChildPhoto,
			$ChildID: info.ChildID,
		});
		db.close();
	},

};

	module.exports = updateDB;