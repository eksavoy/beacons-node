var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  console.log("Return all devise");
});
router.get('/:id', function(req, res){
  console.log("return one devise identify by id (deviseID android)");
});
router.post('/', function(req, res){
  console.log("add new devise");
});
router.put('/:id', function(req, res){
  console.log("update one devise");
});
router.delete('/:id', function(req, res){
  console.log("delete on devise");
});
router.get('/searchByName/:name', function(req, res){
  console.log("search devise by name");
});
router.get('/searchById/:id', function(req, res){
  console.log("search devise by id");
});

module.exports = router;
