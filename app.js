var express = require('express');
var app = express();
var fs = require('fs');
var file = "DaycareDB.db";
var exists = fs.existsSync(file);
//var db = OpenDatabase(file);

app.use(express.static(__dirname + '/Project'));

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    res.sendFile('Project/Home.html', {root: __dirname });
//	app.use('html',express.static(path.join(__dirname, 'Project/Home.html')));
//	res.sendFile('/Home.html', {root: __dirname })
});

app.get('/Home',function(req,res){
  res.sendFile('/children.html');
});

app.listen(3000);
console.log("running at port 3000");
//app.get('/sitemap',function(req,res){
 // res.sendFile(path.join(__dirname+'/sitemap.html'));
//});

//app.listen(3000);

//console.log("Running at Port 3000");

//app.listen(3001, function () {
 // console.log('Example app listening on port 3001!   \n' + __dirname);
//});