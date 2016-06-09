const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var devises = require('./devise/router.js');
var beacons = require('./beacon/router.js');

var app = express();
var db;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const PORT=4000

MongoClient.connect('mongodb://10.134.15.103:27017/Beacons', (err, database) => {
  if(err){
      console.log(err);
      process.exit();
  }else {
    app.listen(PORT, function() {
      console.log("Server run on port " + PORT);
    });
    app.use(function(req,res,next){
        req.db = database;
        next();
    });
    app.use('/static', express.static(__dirname + '/public'));
  }

});



app.use('/devises', devises);
//app.use('/beacons', beacons);

app.get('/', function(req, res){
  res.redirect('/static/index.html');
});
