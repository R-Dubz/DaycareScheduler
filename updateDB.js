/*
This library holds functions to be used in order to modify the database
*/

var rawData;
var splitData = rawData.split(','); // this is to be put into quickstart.js to prepare data for input


function inputFormToDB( info[] ) {
	var fs = require("fs");
	var file = "DaycareDB.db";
	var exists = fs.existsSync(file);

	if (!exists) {
		throw new Error("File not Found");
	}

	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);

	db.run("INSERT INTO Personal_Information VALUES ('info[0]','info[1]','info[2]','info[3]','info[4]','info[5]','info[6]','info[7]','info[8]','info[9]','info[10]','info[11]','info[12]','info[13]','info[14]','info[15]','info[16]','info[17]','info[18]','info[19]','info[20]','info[21]','info[22]','info[23]')");
}

