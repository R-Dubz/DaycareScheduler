var express = require('express');
var app = express();

app.use('/html', express.static(__dirname, '/Project1'));

app.get('/', function (req, res) {
    res.sendFile('/project.html', {root: __dirname })
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});