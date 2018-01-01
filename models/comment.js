var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var DBSuper = require("./../db/super");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	username: {type: 'string'},
	content:{type: 'string'},
	navId: {type: 'string'},
	categories: [
		{type: Object}
	],
	articleId: {type: 'string'},
	serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

Scheam.plugin(DBSuper.regFind);
var Comment = mongoose.model('comment', Scheam);

module.exports = Comment;