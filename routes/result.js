var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.show == undefined)
  	result = '您还未进行任何操作';
  else
  	result = req.session.show.result;
  res.render('result',result);
});

module.exports = router;
