var express = require('express');
var path = require('path');
var compression = require('compression');
var app = express();

app.use(express.static(path.join(__dirname + './../')))

app.listen(4200, function (err) {
	if(err){
		console.error(err);
	}
	console.log('swervin on port 4200');
})