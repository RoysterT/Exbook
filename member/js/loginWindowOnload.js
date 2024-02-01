// 清除网页加载时的transitionn过渡
window.onload = function () {
     let getBody = document.querySelector('.none-transition');
     getBody.className = '';
}

// footer固定
// $(function(){
//      function footerPosition(){
//          $(".footer-wrapper").removeClass("fixed-bottom");
//          var contentHeight = document.body.scrollHeight,//网页正文全文高度
//              winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
//          if(!(contentHeight > winHeight)){
//              //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
//              $(".footer-wrapper").addClass("fixed-bottom");
//          }
//      }
//      footerPosition();
//      $(window).resize(footerPosition);
// });

// 访问来源，判断登录还是注册
function getRequest() {
     var url = location.search;
     // 有参数
     if (url.indexOf("?") != -1) {
         var str = url.substr(1);
         kv = str.split("=");
         // alert(kv[1]);
         // 参数为注册
         if (kv[1] == "reg") {
             toRegisterBtn.onclick();
         }
     }
 }
 getRequest();
 // 判断登录状态
 var loginStatus = sessionStorage.getItem("loginStatus");
 if (loginStatus == "true") { // 已存在登录状态
     var loginUserName = sessionStorage.getItem("user");
     // 重新登陆
     if(confirm("已登录到账户" + loginUserName + "，是否退出登录？")){
         sessionStorage.removeItem("loginStatus");
         sessionStorage.setItem("loginStatus", false);
     }
     else{
         window.location.href="./../index.html";
     }
 }