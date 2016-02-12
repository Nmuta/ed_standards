var express = require('express');
var router = express.Router();
var bookshelf = require("../db/bookshelf");


var Topics = bookshelf.Model.extend({
  tableName: 'topics',
});

/* GET all Topics listing. */
router.get('/', function(req, res, next) {
  Topics.fetchAll().then(function(topics) {
    res.send(topics.toJSON());
  }).catch(function(err) {
    console.error(err);
  });
});

/* GET all Topics listing. */
router.get('/:id', function(req, res, next) {
  Topics.where('id', req.params.id).fetch().then(function(topic) {
    res.json(topic.toJSON());
  }).catch(function(err) {
    console.error(err);
    res.json({});
  });
});

router.post('/', function(req, res, next) {
  new Topics(req.body).save().then(function(model) {
    var response = {response: "server side topic creation"}
    res.json(response);
  });
});

router.post('/:id', function(req, res, next) {
   new Topics('id', req.params.id).save(req.body, {patch: true}).then(function(topic) {
    res.json({response: true});
  });
});

// router.get('/:id/delete', function(req, res, next) {
//   var topic_id = req.params.id;
//   new Topics('id', topic_id).destroy().then(function(topic) {
//     res.json({});
//   });
// });

router.delete('/:id', function(req, res, next) {
  var topic_id = req.params.id;
  new Topics('id', topic_id).destroy().then(function(topic) {
    res.json({});
  });
});



module.exports = router;
