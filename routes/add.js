var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfor');
var accountSet = require('../models/account');
var cLogin = require('./checkLogin');

/* GET home page. */
router.get('/', function(req, res, next) {
	var isLogin =	cLogin.checkLogin(req); //判断是否登陆
  	res.render('add',{isLogin:isLogin});
});

router.post('/', function(req, res, next) {
	console.log((req.body.money-req.body.xiaofei));
	var newData = new recordSet({
	  	id:req.body.cardId,//卡号
		name:req.body.name,//姓名
		tel:req.body.tel,//手机号
		monLeft:(req.body.money-req.body.xiaofei),//余额
		rgData:Date.now(),//注册时间
		recorder:[{isCZ:"1",money:req.body.money,date:Date.now()},{isCZ:"0",money:req.body.xiaofei,date:Date.now()}]
  	});

	accountSet.find({},function(err,data){
  		if(data.length==0) //避免第一次插入的影响.将其初始化
  		{
  			var temp = {totalCZ:0,totalXF:0};
  			var accData = new accountSet({flag:'zj',totalCZ:req.body.money-'0'+temp.totalCZ,totalXF:req.body.xiaofei-'0'+temp.totalXF});
  			newData.save(function(err){ //保存注册数据
  			//下面为插入账户数据
	  			accData.save(function(err){
	  				req.session.show={result:'成功完成注册'};
					res.redirect('result');
	  			});
	  		});	
  		}
  		else
  		{
  			var temp = data[0];
  			newData.save(function(err){ //保存注册数据
  			//下面为更新账户数据
	  			accountSet.update({flag:'zj'},{$set:{totalCZ:req.body.money-'0'+temp.totalCZ,totalXF:req.body.xiaofei-'0'+temp.totalXF}},function(err){
	  				req.session.show={result:'成功完成注册'};
					res.redirect('result');
	  			});
	  		});	
  		}       	
	});
 	
});
module.exports = router;
