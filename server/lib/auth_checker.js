var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // check if users is authenticated ..
  req.auth_check = "valid";
  next();
});

module.exports = router;
