var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfor');
var accountSet = require('../models/account');

var te="";


/* GET home page. */
router.get('/', function(req, res, next) {
    te = req.query.tel;
    recordSet.find({tel:te},function(err,data){
  		//var userInfo = {tel:req.query.tel,money:data[0].monLeft,id:data[0].id,name:data[0].name};
		if(data.length!=0) //如果有数据
			res.send('success');
		else
			res.send({data:'none'});//这是为了ajax。如果有没有，则可以插入
	});
});


module.exports = router;

	// recordSet.find({},function(err,data){
	// 		console.log(data);
	// 	});
