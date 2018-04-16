var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var DBSuper = require("./super");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title: String,  // 标题
	 headline: String,
	 homeFigure: String,
	 themes: [
		 {presentation: String, photo: String}
	 ],
	 createdTime: { type: String, default: Utils.getTime(new Date(), "s")},
	 createdAt: {default: new Date(), type: Date}
});

Scheam.plugin(DBSuper.regNav);
Scheam.plugin(DBSuper.regFind);
var User = mongoose.model('special ', Scheam);

module.exports = User;