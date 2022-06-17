var express = require('express');
var router = express.Router();

/* GET category listing. */
router.get('/', function(req, res) {
  res.render('admin/category', {title: 'Admin'});
});

/* GET products listing. */
router.get('/products', function(req, res) {
  res.render('admin/products', {title: 'Admin'});
});

router.get('/addProduct', function(req, res) {
  res.render('admin/addProduct', {title: 'Admin'});
});

module.exports = router;
