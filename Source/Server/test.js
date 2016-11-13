var quickstart = require('./quickstart.js');
var updateDB = require('./updateDB.js');

function RefreshDatabase() {
    quickstart.runQuickstart();
}

function  loadWaitingList(callback) {
    updateDB.callWaitingList(callback);
}


module.exports = {
    RefreshDatabase: RefreshDatabase,
    loadWaitingList: loadWaitingList

};