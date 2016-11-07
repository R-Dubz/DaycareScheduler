var run = require('./quickstart.js');

function mySpecialFunction() {
    var msg = run.runQuickstart();
    return msg;
}

module.exports = {
    mySpecialFunction: mySpecialFunction
};