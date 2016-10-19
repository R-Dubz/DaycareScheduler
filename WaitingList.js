/* This will be used to connect to the google doc containing new
	children information, importing the data, and then inserting
	the data into our database.
*/



/* This function opens and imports from google docs */

function loadData() {

  window.alert("Started loadData()");

  var url="https://spreadsheets.google.com/feeds/cells/1EV8S8AaAmxF3vP0F6RWxKIUlvF6uFEmsrOFWA1oNBYI/od6/public/values?alt=json-in-script&callback=myCallback";
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status==200){
      document.getElementById("display").innerHTML = xmlhttp.responseText;
    }
  };
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);

  window.alert("Finished loadData()");
}

function updateDB() {
	var fs = require("fs");
	var file = "DaycareDB.db";
	var exists = fs.existsSync(file);

	if (!exists) {
		throw new Error("File not Found");
	}

	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);

	/* db.serialize(function() {
		var stmt = db.prepare("INSERT INTO Personal_Information

*/
}
