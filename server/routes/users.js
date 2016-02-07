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
  var password = req.body.password;
  var logged_in = false;
  Users.where('email',email ).fetch().then(function(usr) {
    var hshed_pwd = usr.toJSON().password;
    console.log("comparing "+password+" with "+hshed_pwd);
    bcrypt.compare(password, hshed_pwd, function(err, res) {
      if (res){
        logged_in = true;
        console.log("i logged in a user");
      } else {
        console.log("i rejected in a user");
      }
    });
    res.json({logged_in: logged_in})
  }).catch(function(err) {
    console.error(err);
    console.log("error logging in a user");
    res.json({logged_in: false});
  });
});

module.exports = router;
