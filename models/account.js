var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObejectId = Schema.ObejectId;

var accountSchema = new Schema({
	flag:String,
	totalCZ:Number,//总充值额
	totalXF:Number,//总消费额
});
module.exports = mongoose.model('account',accountSchema);