var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '' });
});
router.post('/', function(req, res, next) {
	console.log(req.body);
	if(req.body.id=="55"&&req.body.pwd=="51888888")
	{
		//console.log(req.session);
		req.session.user={id:"55",pwd:"51888888"};
		res.redirect('index');
	}
	else
		res.render('login', { title: '密码错误，请重新登陆！' });

});

module.exports = router;
