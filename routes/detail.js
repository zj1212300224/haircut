var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfor');
var cLogin = require('./checkLogin');

/* 显示会员的信息 */
router.get('/', function(req, res, next) {
	if(req.query.tel&&req.query.tel.length==11)	 //正确请求
	{
		var isLogin =	cLogin.checkLogin(req); //判断是否登陆
	  	recordSet.find({tel:req.query.tel},function(err,data){
	  		//var userInfo = {tel:req.query.tel,money:data[0].monLeft,id:data[0].id,name:data[0].name};
			res.render('detail',{userInfor:data[0],isLogin:isLogin});
		});
	}
	else{
		res.render('result',{result:'错误请求，请输入正确的网址'});
	}
});

module.exports = router;
