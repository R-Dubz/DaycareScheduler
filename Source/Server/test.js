var quickstart = require('./quickstart.js');

function RefreshDatabase() {
    // quickstart.runQuickstart();
    var footballTeams = {
    AFCEast: ["Patriots", "Jets", "Bills", "Dolphins"],
    AFCNorth: ["Ravens", "Steelers", "Bengals", "Browns"],
    AFCWest: ["Raiders", "Chargers", "Chiefs", "Broncos"],
    AFCSouth: ["Texans", "Colts", "Titans", "Jaguars"]
    }
    return footballTeams;
}



module.exports = {
    RefreshDatabase: RefreshDatabase
};