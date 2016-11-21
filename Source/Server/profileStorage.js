var updateDB = require('./updateDB.js');
var profile = [];

var profileStorage = {

    storeProfile: function(child){
        var profileID = {ChildID: child.ChildID};
        profile.push(profileID);
    },

    retrieveProfile: function(callback){

        updateDB.callProfile(profile[0], function(err, data){
        if(err) {
            // handle the error here
            callback(err);
            return;
        }
        // send the data
            profile = [];
            callback(null, data);
        })
    }


};	

module.exports = profileStorage;