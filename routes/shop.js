var express = require('express');
var router = express.Router();

/* GET shop listing. */
router.get('/', function(req, res) {
  res.render('shop', { title: 'Marvel Shop' });
});

module.exports = router;
