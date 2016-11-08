var quickstart = require('./quickstart.js');
var updateDB = require('./updateDB.js');

function RefreshDatabase() {
    quickstart.runQuickstart();
    // var footballTeams = {
    // AFCEast: ["Patriots", "Jets", "Bills", "Dolphins"],
    // AFCNorth: ["Ravens", "Steelers", "Bengals", "Browns"],
    // AFCWest: ["Raiders", "Chargers", "Chiefs", "Broncos"],
    // AFCSouth: ["Texans", "Colts", "Titans", "Jaguars"]
    // }
    // return footballTeams;
}

function  loadWaitingList() {
    updateDB.callWaitingList();
}


module.exports = {
    RefreshDatabase: RefreshDatabase,
    loadWaitingList: loadWaitingList

};