var express = require('express');
var router = express.Router();

/* GET shop listing. */
router.get('/', function(req, res) {
  res.render('cart', { title: 'Cart' });
});

module.exports = router;
