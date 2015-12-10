var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfor');
var cLogin = require('./checkLogin');
var accountSet = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.query.tel&&req.query.tel.length==11)
    	recordSet.find({tel:req.query.tel},function(err,data){
			if(data.length==0) //如果用户不存在，直接定向
		  	{
		  		req.session.show = {result:"用户"+req.query.tel+"不存在，删除失败"};
		  		res.redirect('result');
		  	}
		  	else
			{	
				var money = data[0].monLeft;
				recordSet.remove({tel:req.query.tel},function(err,data){
		  		//var userInfo = {tel:req.query.tel,money:data[0].monLeft,id:data[0].id,name:data[0].name};
			  		accountSet.find({},function(err,data){
						var temp = data[0];
						accountSet.update({flag:'zj'},{$set:{totalCZ:temp.totalCZ-money}},function(err){
							//这里的重定向，是为了防止重复刷新页面对订单的干扰
							req.session.show = {result:"成功删除用户"+req.query.tel};
							res.redirect('result');
			  			});
					});
				});
			}	  	
		});		
    else{
		res.render('result',{result:'错误请求，请输入正确的网址'});
	}
});

module.exports = router;
