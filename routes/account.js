var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfor');
var accountSet = require('../models/account');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var data1;
    recordSet.find({},function(err,data){
    	data1=data;
  	    accountSet.find({},function(err,data){
  	
		 	res.render('account',{userInfor:data1,accInfor:data});
	    });
    });
});

module.exports = router;
