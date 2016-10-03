var express = require('express');
var app = express();

app.use(express.static(__dirname + '/Project'));

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    res.sendFile('project.html');
//	app.use('html',express.static(path.join(__dirname, 'Project/Home.html')));
//	res.sendFile('/Home.html', {root: __dirname })
});

app.get('/Home',function(req,res){
  res.sendFile('/Home.html');
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