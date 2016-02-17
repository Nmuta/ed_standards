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

// get /standards/id
function getStandards() {
  var response = {
    links: {
      self: ".....",
      edit: "/standards/57/edit", // <-- only pu this in if they have permission
      delete: "/standards/57/edit", // <-- only pu this in if they have permission
      children: "/standards/57/sub-standards", // <-- only pu this in if they have permission
    },
    data: {
      id: 57,
      attributes: {
        name: "users should be nice and smile"
      }
    }
  }
}

//first middleware
function populateUser(req, res, next){
  var user = jwt.verify(token, jwtSecret);
  /// tie req.user to user .....
  // pass to next () 
}

// router.use(populateUser);
// app.use(populateUser); // <-- in app.js (apply to _all_ routes)

/* GET users listing. */
router.get('/', populateUser, function () {

});

// TODO: change /checkadmin /me - just return a json object w/ that user's roles
router.post('/checkadmin', function(req, res, next) {
  console.log("checking if this is an admin ");
  var uid = req.body.uid;
  Users.where('id',uid ).fetch({withRelated: ['role']}).then(function(usr) {
     user = usr.toJSON();
     var is_admin = usr.role.name==="Admin" ? true : false;
     console.log("user role is ", usr.role.name);
     console.log("am I an admin? "+is_admin);
     res.send({is_admin: is_admin});
  });
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  Users.where('email',email ).fetch({withRelated: ['role']}).then(function(usr) {
    user = usr.toJSON();
    var hshed_pwd =user.password;
    bcrypt.compare(password, hshed_pwd, function(err, response) {
      if (response){
        var user_bundle = {id: user.id }
        var token  = jwt.sign(user_bundle, jwtSecret);
        res.json({username: user.name, uid: user.id, token: token});
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
