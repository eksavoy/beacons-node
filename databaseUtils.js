const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/Beacons', (err, database) => {
  db = database;
  if(err){
    console.log(err);
  }
});
