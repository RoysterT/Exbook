// 清除网页加载时的transitionn过渡
window.onload = function () {
     console.log("7")
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