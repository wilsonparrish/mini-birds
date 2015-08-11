var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

//How to connect to database:

//Run mongod
var db = mongojs('birds', ['sightings']);
var port = 27017;
var nodePort = process.argv[2] || 3000;

app.post('/api/sighting', function(req, res){
	db.sightings.insert(req.body, function(err, result){
		if(err){
			return res.status(500).json(err);
		}
		else{
			return res.json(result);
		}
	});
})
app.get('/api/sighting', function(req, res){
	console.log(req.query);
	db.sightings.find(req.query, function(err, bird){
		if(!err){
			res.json(bird);
		}
		else{
			res.status(500).json(err);
		}
	});
})
app.delete('/api/sighting', function(req, res){
	db.sightings.remove(req.query, function(err, result){
		if(!err){
			res.json(result);
		}
		else{
			res.status(500).json(err);
		}
	})
})
app.put('/api/sighting', function(req, res){
	console.log('put hit');
	res.end();
})


app.listen(nodePort, function(){
	console.log("listening on port: " + nodePort);
});