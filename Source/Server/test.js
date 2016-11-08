var run = require('./quickstart.js');

function mySpecialFunction() {
    run.runQuickstart();
    // var msg = "This is a test";
    // return msg;
}

module.exports = {
    mySpecialFunction: mySpecialFunction
};