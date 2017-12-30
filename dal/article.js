var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var DBSuper = require("./../dbsuper/index");

// 获取分页数据
exports.getPaging = function(params, cb) {
    params.model = ArticleModel;
    DBSuper.findAll(NavModel).then(function(navs) {
         DBSuper.find(params).then(function(articles) {
             ArticleModel.count(params.conditions, function(err, total) {
                 cb({
                    navs,
                    articles,
                    total
                 });
             });
         });
    });
}

// 添加文章列表
exports.submit = function(fields) {
    var model = new ArticleModel(fields);
    return DBSuper.save(model);
}
