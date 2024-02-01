// 人工客服
var floatBarService = document.getElementsByClassName("float-bar-item")[0];
var headerService = document.getElementById("customerService");
headerService.onclick = function () {
    alert("抱歉！商城目前暂不支持在线客服！");
};
floatBarService.onclick = function () {
    headerService.onclick();
};

// 意见反馈
var feedback = document.getElementsByClassName("float-bar-item")[1];
feedback.onclick = function () {
    location.href = "mailto:211549130@m.gduf.edu.cn";
};

// 购物车
var floatBarCart = document.getElementById("floatBarCart");
floatBarCart.onclick = function () {
    location.href = "../../cart.html";
};

// 返回顶部
var goTopBtn = document.getElementById('toTop');
var floatBar = document.getElementById('floatBar');
let scrollTop = 0;
window.onscroll = () => {
    // 已经滑过页面的高度
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 隐藏或显示返回顶部按钮
    scrollTop >= 360 ? (goTopBtn.style.opacity = '1') : (goTopBtn.style.opacity = '0');
    scrollTop >= 360 ? (floatBar.style.height = '352px') : (floatBar.style.height = '264px');
}
goTopBtn.onclick = () => {
    // 清空上一次的定时器
    let timer = null;
    clearInterval(timer);
    // 每次滚动当前已滑过页面高度的1/80
    var eachScroll = scrollTop / 80;
    // 每0.15ms执行一次
    timer = setInterval(() => {
        scrollTop -= eachScroll;
        window.scrollTo(0, scrollTop);
        // 当scrollTop小于1时，直接使 scrollTop 为0并且清空定时器
        if (scrollTop < 1) {
            window.scrollTo(0, 0);
            clearInterval(timer);
        }
    }, .05)
}