var express = require('express');
var router = express.Router();
var cLogin = require('./checkLogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  var isLogin =	cLogin.checkLogin(req);
  res.render('index',{isLogin:isLogin});
});

module.exports = router;
