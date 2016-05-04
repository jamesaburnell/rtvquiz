var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname + './../')))

app.listen(4000, function (err) {
	if(err){
		console.error(err);
	}
	console.log('server up on port 4000');
})