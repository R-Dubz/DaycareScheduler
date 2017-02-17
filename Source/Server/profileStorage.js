var updateDB = require('./updateDB.js');
var profileStorage = {

    callProfileDB: function(callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT * FROM CurrentProfile WHERE RowID = 1",
		 function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
    },

    retrieveProfile: function(ID, callback){

        updateDB.callProfile(ID, function(err, data){
        if(err) {
            // handle the error here
            callback(err);
            return;
        }
        // send the data
            profile = [];
            callback(null, data);
        });
    },

	callEmployeeProfileDB: function(callback){
		var fs = require("fs");
		var file = "./Source/Server/Data/DaycareDB.db";
		var exists = fs.existsSync(file);
		if (!exists) {
			throw new Error("File not Found");
		}
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.all("SELECT EmployeeID FROM CurrentProfile WHERE RowID = 1",
		 function(err, row) {
			if (err){
				callback(err);
				return;
			}				
			callback(null, row);
		});

		db.close();
    },

	retrieveEmployeeProfile: function(ID, callback){

        updateDB.callEmployeeProfile(ID, function(err, data){
        if(err) {
            // handle the error here
            callback(err);
            return;
        }
        // send the data
            profile = [];
            callback(null, data);
        });
    },
};	

module.exports = profileStorage;