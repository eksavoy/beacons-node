var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://10.134.15.103:27017/Beacons', function(err, database){
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
    if (err) {
      console.log(err);
      res.status(500);
      res.send({"status":0});
    }
    console.log(result);
    console.log("Devise inserted");
    res.status(202);
    res.send({"status":1});
  });
});

router.put('/:id', function(req, res){
  db.collection('devises').update({
    "deviseID": req.params.id
  }, req.body, function(err, result){
    if (err){
        console.log(err);
        res.status(500);
        res.send({"status":0})
    }
    console.log("Devise udpated");
    res.status(200);
    res.send({"status":1});
  })
});

router.delete('/:id', function(req, res){
  db.collection('devises').findAndRemove({"deviseID": req.params.id}, [['deviseID', 1]], function(err, result){
    if (err){
      console.log(err);
      res.status(500);
      res.send({"status":0});
    }
    console.log("Devise deleted");
    res.status(200);
    res.send({"status":1});
  })
});

router.get('/searchByName/:name', function(req, res){
  db.collection('devises').find({"deviseName": req.params.name}).toArray(function(err, result){
    if (err) return console.log(err);
    res.send(result);
  });
});


module.exports = router;
