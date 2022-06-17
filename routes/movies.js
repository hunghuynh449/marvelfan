var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res) {
  res.render('movies', { title: 'Marvel Movies' });
});

module.exports = router;
