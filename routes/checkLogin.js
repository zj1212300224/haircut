function checkLogin(req){
	if(req.session.user != undefined)
	{ //已登陆
		return true;
	}
	else
	{
		return false;
	}
}
//检测session中是否有用户的信息
module.exports.checkLogin = checkLogin;
