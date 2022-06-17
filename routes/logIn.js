var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('logIn', { title: 'Marvel' });
  });
  
  module.exports = router;