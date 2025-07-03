var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('operators', { title: 'Operators DB' });
});

module.exports = router;
