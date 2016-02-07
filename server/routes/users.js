var express = require('express');
var router = express.Router();
var bookshelf = require("../db/bookshelf");
var bcrypt = require("bcrypt");

var Users = bookshelf.Model.extend({
  tableName: 'users'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var logged_in = false;
  Users.where('email',email ).fetch().then(function(usr) {
    bcrypt.compare(email, usr.email, function(err, res) {
      logged_in = true;
      console.log("i logged in a user");
    });
    res.json({logged_in: logged_in})
  }).catch(function(err) {
    console.error(err);
    console.log("i rejected in a user");
    res.json({logged_in: false});
  });
});

module.exports = router;
