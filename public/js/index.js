$(document).ready(function() {
    var bannerItem = $("#bannerPanel").find(".banner-item");
    var header = $("#header");
    var nav = header.children("nav:eq(0)");
    var homeFont = nav.find(".nav-item:eq(0) > a");
    var homeIcon = header.find('h1:eq(0)');
     // banner 轮播
     bannerItem.not(":first").hide();
     var bannerIndex = 0;
     setInterval(function() {
         bannerIndex+= 1;
         if (bannerIndex >= $('.banner-item').length) {
             bannerIndex = 0;
         }
         $(".banner-item").eq(bannerIndex).fadeIn(800).siblings().fadeOut(800);
     }, 3000);

      // 返回到首页   
     $([homeFont, homeIcon]).each(function(index, item) {
         $(item).click(function() {
            window.location.href = location.origin;
         });
     });

     var inited = false;
     // 分页初始化
     var articlePaging = $("#articlePaging");
     if (articlePaging[0]) {
        var currentPage = articlePaging.attr('currentPage');
        var navId = articlePaging.attr("navId");
        var categoryId = articlePaging.attr("categoryId");
        var total = articlePaging.attr("total");
        articlePaging.paging({
            initPageNo: currentPage, // 初始页码
            totalPages: Math.ceil(total / 10), //总页数
            totalCount: '共'+total+'条', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒 
            callback: function(pageNo) { // 回调函数 
                if (inited) {
                    window.location.href=window.location.origin+"/article/view/"+navId+"/"+categoryId+"/"+pageNo;
                }
                inited = true;
            }
        });
     }

    //  // 评论页面分页初始化
     var commentPaging = $("#commentPaging");
     if (commentPaging[0]) {
        var total = commentPaging.attr("total");
        // var navId = commentPaging.attr("navId");
        // var categoryId =commentPaging.attr("categoryId");
        var articleId = commentPaging.attr("articleId");
        var currentPage = commentPaging.attr("currentPage");
        commentPaging.paging({
            initPageNo: currentPage, // 初始页码
            totalPages: Math.ceil(total / 10), //总页数
            totalCount: '共'+total+'条', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒 
            callback: function(no) { // 回调函数 
                if (inited)
                window.location.href = window.location.origin+"/article/article/view/"+articleId+"/"+no;
                inited = true;
            }
        });
     }

    //  //发表文章详情页的评论
     $("#publishCommentBtn").click(function() {
         var detailId = $(this).attr('detailId');
        $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){ 
              var country = remote_ip_info["country"];
              var province = remote_ip_info["province"];  
              var city = remote_ip_info["city"];    
              var username = province+city+"用户说:"
              var content = $("#commentContent").val();
              var params = {
                  username, 
                  content,
                  detailId
              };
              debugger;
              $.ajax({
                 url: '/article/comment/submit',
                 data: params,
                 type:'post',
                 success: function(res) {
                   if (res.status) {
                       alert("评论成功");
                   } else {
                       alert(res.msg);
                   }
                 },
                 error: function() {
                     alert("提交失败");
                 }
              });
         }) ;   
     });

     
    $("#articleContent").html($("#articleContent").text());

});
