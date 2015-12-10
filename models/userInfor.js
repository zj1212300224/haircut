var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObejectId = Schema.ObejectId;

var recSch = new Schema({
	isCZ:String,//1表示充值，0表示消费
	money:Number,//充值或消费的额度
	date:Date//时间
});

var userSchema = new Schema({
	id:String,//卡号
	name:String,//姓名
	tel:String,//手机号
	monLeft:Number,//余额
	rgData:Date,//注册
	recorder:[recSch]//充值与消费记录
});
module.exports = mongoose.model('userInfor',userSchema);