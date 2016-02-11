var express = require('express');
var router = express.Router();
var bookshelf = require("../db/bookshelf");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
//TODO: relocate to .env
var jwtSecret = "asdfkladsfasdfsd";

var Role = bookshelf.Model.extend({
  tableName: 'roles',
  users: function() {
    return this.hasMany(Users);
  }
});

var Users = bookshelf.Model.extend({
  tableName: 'users',
  role: function() {
    return this.belongsTo(Role);
  }
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  Users.where('email',email ).fetch({withRelated: ['role']}).then(function(usr) {
    user = usr.toJSON();
    var hshed_pwd =user.password;
    bcrypt.compare(password, hshed_pwd, function(err, response) {
      if (response){
        var user_bundle = {email: user.email, username: user.name }
        var token  = jwt.sign(user_bundle, jwtSecret);
        res.json({username: user.name, token: token, admin: user.role.name==="Admin"});
        console.log("success logging in a user");
      }else{
        console.log("bad password");
        res.json({username: false});
      }
    });

  }).catch(function(err) {
    console.error(err);
    console.log("error logging in a user");
    res.json({logged_in: false});
  });
});

module.exports = router;
