var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/Beacons', (err, database) => {
  db = database;
  if(err){
    console.log(err);
  }
});


router.get('/', function(req, res){
  db.collection('devises').find({}).toArray(function(error, documents){
    res.send(documents);
  });
});

router.get('/:id', function(req, res){
  db.collection('devises').find({"deviseID": req.params.id}).toArray(function(error, documents){
    res.send(documents);
  });
});

router.post('/', function(req, res){
  db.collection('devises').insert(req.body, function(err, result){
    if (err) return console.log(err);
    console.log("Devise inserted");
    res.status(202);
    res.send();
  });
});

router.put('/:id', function(req, res){
  db.collection('devises').update({
    "deviseID": req.params.id
  }, {
    $set: {
      "location": req.body.location
    }
  }, function(err, result){
    if (err) return console.log(err);
    console.log("Devise udpated");
    res.status(200);
    res.send();
  })
});

router.delete('/:id', function(req, res){
  db.collection('devises').findAndRemove({"deviseID": req.params.id}, [['deviseID', 1]], function(err, result){
    if (err) return console.log(err);
    console.log("Devise deleted");
    res.status(200);
    res.send();
  })
});

router.get('/searchByName/:name', function(req, res){
  db.collection('devises').find({"deviseName": req.params.name}).toArray(function(err, result){
    if (err) return console.log(err);
    res.send(result);
  });
});

router.get('/searchById/:id', function(req, res){
  db.collection('devises').find({"deviseID": req.params.id}).toArray(function(err, result){
    if (err) return console.log(err);
    res.send(result);
  });
});

module.exports = router;
