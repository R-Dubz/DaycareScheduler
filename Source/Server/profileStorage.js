var profile = [];

var profileStorage = {

    storeProfile: function(child){
        profile.push(child);
    },

    retrieveProfile: function(callback){
        var data = profile[0];
        profile = [];
        callback(null, data);
    }


};	

module.exports = profileStorage;