var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://10.134.15.103:27017/Beacons', (err, database) => {
  db = database;
  if(err){
    console.log(err);
  }
});

router.get('/', function(req, res){
  db.collection('beacons').find({}).toArray(function(error, documents){
    res.send(documents);
  });
});

router.get('/:id', function(req, res){
  db.collection('beacons').find({"beaconID": req.params.id}).toArray(function(error, documents){
    res.send(documents);
  });
});

router.post('/', function(req, res){
  db.collection('beacons').insert(req.body, function(err, result){
    if (err) return console.log(err);
    console.log("beacon inserted");
    res.status(202);
    res.send();
  });
});

router.put('/:id', function(req, res){
  db.collection('beacons').update({
    "beaconID": req.params.id
  }, {
    $set: {
      "location": req.body.location
    }
  }, function(err, result){
    if (err) return console.log(err);
    console.log("beacon udpated");
    res.status(200);
    res.send();
  })
});

router.delete('/:id', function(req, res){
  db.collection('beacons').findAndRemove({"beaconID": req.params.id}, [['beaconID', 1]], function(err, result){
    if (err) return console.log(err);
    console.log("beacon deleted");
    res.status(200);
    res.send();
  })
});

router.get('/searchByName/:name', function(req, res){
  console.log(req.params.name);
  db.collection('beacons').find({"beaconName": req.params.name}).toArray(function(err, result){
    if (err) return console.log(err);
    res.send(result);
  });
});

module.exports = router;
