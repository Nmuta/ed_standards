var express = require('express');
var router = express.Router();
var bookshelf = require("../db/bookshelf");


var Standards = bookshelf.Model.extend({
  tableName: 'standards',
  comments: function() {
    return this.hasMany(Comments);
  }
});

var Comments = bookshelf.Model.extend({
  tableName: 'comments',
  standard: function() {
    return this.belongsTo(Standards);
  }
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
  Standards.where('id', req.params.id).fetch({withRelated: ['comments']}).then(function(stan) {
    //res.json(stan.related('comments').toJSON());
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

// comments
router.post('/:id/comments', function(req, res, next) {
  var stan_id = req.params.id;
  new Comments({comment: req.body.comment, standard_id: stan_id}).save().then(function(model) {
    res.redirect('/standards/'+stan_id);
  });
});

module.exports = router;
