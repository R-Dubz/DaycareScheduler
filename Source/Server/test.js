var run = require('./quickstart.js');

function mySpecialFunction() {
    // run.runQuickstart();
    var footballTeams = {
    AFCEast: ["Patriots", "Jets", "Bills", "Dolphins"],
    AFCNorth: ["Ravens", "Steelers", "Bengals", "Browns"],
    AFCWest: ["Raiders", "Chargers", "Chiefs", "Broncos"],
    AFCSouth: ["Texans", "Colts", "Titans", "Jaguars"]
    }

    // footballTeams.push(AFCEast);
    // footballTeams.push(AFCNorth);
    // footballTeams.push(AFCWest);
    // footballTeams.push(AFCSouth);

    return footballTeams;
    
    
}

module.exports = {
    mySpecialFunction: mySpecialFunction
};