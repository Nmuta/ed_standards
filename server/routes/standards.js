var express = require('express');
var router = express.Router();
var bookshelf = require("../db/bookshelf");


var Standards = bookshelf.Model.extend({
  tableName: 'standards'
});

/* GET all standards listing. */
router.get('/', function(req, res, next) {
  Standards.fetchAll().then(function(stan) {
    res.send(stan.toJSON());
  }).catch(function(err) {
    console.error(err);
  });
});

/* GET all standards listing. */
router.get('/:id', function(req, res, next) {
  Standards.where('id', req.params.id).fetch().then(function(stan) {
    res.json(stan.toJSON());
  }).catch(function(err) {
    console.error(err);
    res.json({});
  });
});

router.post('/', function(req, res, next) {
  new Standards(req.body).save().then(function(model) {
    res.redirect("/standards");
  });
});

router.post('/:id/update', function(req, res, next) {
   new Standards('id', req.params.id).save(req.body, {patch: true}).then(function(model) {
    res.redirect("/standards");
  });
});

module.exports = router;
