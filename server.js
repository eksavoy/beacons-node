const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var devises = require('./devise/router.js');

var app = express();
var db;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const PORT=4000

MongoClient.connect('mongodb://localhost:27017/Beacons', (err, database) => {
  if(err) console.log(err);
  app.listen(PORT, function() {
    console.log("Server run on port " + PORT);
  });
  app.use(function(req,res,next){
      req.db = database;
      next();
  });
});



app.use('/devises', devises);

app.get('/', function(req, res){
  res.send("Beacons Server");
});
