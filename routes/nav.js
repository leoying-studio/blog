var express = require('express');
var router = express.Router();
var NavModel = require("./../models/nav");
var Utils = require("./../utils");
var Validator = require("./../utils/validator");

router.post("/submit", function(req, res) {
	var body = req.body;
    var categories = body.categories;
    var name = body.name;
    var validate = Validator([
        {mode:"required", message: "导航名称不能为空", value: name},
        {mode: "required", message: "分类字段不合法", value: categories}
    ]);
    if (!validate.status) {
        return res.send({
            status: false,
            message: validate.message
        });
    }
    // 设置导航
    try {
        categories = categories.split(/,|，/g);
        categories = categories.map(function (item) {
            return { name: item }
        });
    } catch (e) {
        return res.send({
            message: e.message,
            status: false
        });
    }
    new NavModel({ name, categories }).save(function (err, nav) {
        if (err) {
           return res.send({
               message: "未知错误",
               status: false
           });
        } 
        res.send({
            status: true,
            data: nav
        });
    }).catch(function(e) {
        res.send({
            status: false,
            msg: e.message
        })
    });
});

// 分类查询
router.get("/categories/data", function(req, res) {
    NavModel.find({_id: req.query.navId}).lean().then(function(nav) {
        res.send({
            data: nav[0].categories,
            total: nav[0].categories.length
        });
    }); 
});

// 查询导航列表
router.get("/data", function(req, res) {
    NavModel.find({}).lean().then(function(nav) {
        res.send({
            status: true,
            data: nav,
            total: nav.length
        });
    });
});

// 添加导航下的类别
router.post('/category/add', function(req, res) {
	var body = req.body;
    var navId = body.navId;
    var name = body.name;
    var validate = Validator([
        {mode: "required", message: "类别名称不能为空", value: name},
        {mode: "required", message: "导航id不能为空", value: navId}
    ]);
    if (!validate.status) {
        return res.send({
            message: validate.message,
            status: false
        });
    }
    NavModel.update({_id: navId},{$push: {categories: {name}}}, function(err, category) {
        if (err) {
            return res.send({
                message: "添加失败",
                status: false
            });
        }
        res.send({
            message: "更新成功",
            data: category,
            status: true
        });
    });
});

// 更新导航下面的类别
router.post("/categoies/update", function(req, res) {
	var body = req.body;
    // var navId = body.navId;
    var categoryId = body.categoryId;
    var name = body.name;
    var validate = Validator([
        {mode: "required", message: "导航名称不能为空", value: name},
        {mode: "required", message: "导航id不能为空", value: categoryId}
    ]);
    if (!validate.status) {
        return res.send({
            status: false,
            msg: validate.message
        });
    }
    NavModel.update({
        'categories._id': categoryId
    }, {
        $set : {"categories.$.name": name }
    }, function(err, state) {
        if (err) {
            return res.send({
                status: false,
                msg: "更新失败"
            });
        }   
        res.send({
            status: true,
            data: state,
            msg: '更新成功'
        });
    });
});

// 更新导航信息
router.post("/update", function(req, res) {
	var body = req.body;
	var navId = body.navId;
	var name = body.name;
	var validator = Validator([
	   {mode: "required", value: name, message: "导航名称不能为空"},
	   {mode: "required", value: navId, message: "导航id不能为空"}
	]);
	if (!validator.status) {
        req.flash("error","参数验证错误");
        return res.redirect("/manager");
	}
	NavModel.update({_id: navId}, {$set: {name}}, function(err, state) {
		if (err) {
           return res.send({
               status: false,
               msg: "更新导航失败"
           });
        } 
        res.send({
            status: true,
            data: state,
            msg: "导航更新成功"
        });
	})
});

module.exports = router;
