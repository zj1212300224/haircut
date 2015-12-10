var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfor');
var accountSet = require('../models/account');
var cLogin = require('./checkLogin');

var te="";


/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.query.tel&&req.query.tel.length==11) //正确请求
	{	
		var isLogin =	cLogin.checkLogin(req); //判断是否登陆
		  	te = req.query.tel;
		  	recordSet.find({tel:te},function(err,data){
		  		//var userInfo = {tel:req.query.tel,money:data[0].monLeft,id:data[0].id,name:data[0].name};
				res.render('doWhat',{userInfor:data[0],isLogin:isLogin});
		});
	}
	else{    
		res.render('result',{result:'错误请求，请输入正确的网址'});
	}
});

router.post('/', function(req, res, next) {
	var moneyleft;
	if(req.body.cz!=0&&req.body.xf!=0) 
	{//既有充值又有消费
		moneyleft = req.body.ye-'0'+(req.body.cz-'0')-(req.body.xf-'0');
	     recordSet.update({tel:te},{$set:{monLeft:moneyleft},$pushAll:{recorder:[{isCZ:"1",money:req.body.cz,date:Date.now()},{isCZ:"0",money:req.body.xf,date:Date.now()}]}},function(err){
	     	accountSet.find({},function(err,data){
				var temp = data[0];
				accountSet.update({flag:'zj'},{$set:{totalCZ:req.body.cz-'0'+temp.totalCZ,totalXF:req.body.xf-'0'+temp.totalXF}},function(err){
					//这里的重定向，是为了防止重复刷新页面对订单的干扰
					req.session.show={result:"成功完成"+req.body.cz+"元充值，"+req.body.xf+"元消费。"};
					res.redirect('result');
	  			});
			});
		 });
	}
	else if(req.body.cz==0&&req.body.xf==0)//都没有
	{
		res.render('result',{result:"0元充值，0元消费"});
	}
	else if(req.body.cz==0)
	{ //充值金额为0
		moneyleft = req.body.ye-'0'-(req.body.xf-'0');
		 recordSet.update({tel:te},{$set:{monLeft:moneyleft},$push:{recorder:{isCZ:"0",money:req.body.xf,date:Date.now()}}},function(err){
		 	accountSet.find({},function(err,data){
				var temp = data[0];
				accountSet.update({flag:'zj'},{$set:{totalXF:req.body.xf-'0'+temp.totalXF}},function(err){
					//同上
					req.session.show={result:"成功完成"+req.body.xf+"元消费"};
					res.redirect('result');
	  			});
				
			});     	
		 });
	}
	else  
	{//x消费金额为0
		moneyleft = req.body.ye-'0'+(req.body.cz-'0');
		recordSet.update({tel:te},{$set:{monLeft:moneyleft},$push:{recorder:{isCZ:"1",money:req.body.cz,date:Date.now()}}},function(err){
			accountSet.find({},function(err,data){
				var temp = data[0];
				accountSet.update({flag:'zj'},{$set:{totalCZ:req.body.cz-'0'+temp.totalCZ}},function(err){
					req.session.show={result:"成功完成"+req.body.cz+"元充值"};
					res.redirect('result');
	  			});
				
			});	     	
		 });
	}
});

module.exports = router;

	// recordSet.find({},function(err,data){
	// 		console.log(data);
	// 	});
