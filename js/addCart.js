// loadCart();
console.log("10")
var addToCartBtn = document.getElementsByClassName("addToCartBtn");
var goodsInShelfAmount = addToCartBtn.length;
for (var i = 0; i < goodsInShelfAmount; i++) {
    addToCartBtn[i].onclick = function () {
        var isFind = false;
        var showBody = document.getElementById("showBody");
        var goodsName = this.parentNode.parentNode.getElementsByClassName("product-name")[0].innerHTML;
        var goodsPrice = this.parentNode.parentNode.getElementsByClassName("product-integer")[0].innerHTML;
        goodsPrice += this.parentNode.parentNode.getElementsByClassName("product-decimal")[0].innerHTML;
        var priceNumber = parseFloat(goodsPrice.substring(1));
        var goodsSrc = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].src;
        for (var j = 0; j < localStorage.length; j++) {
            var key = localStorage.key(j);
            var jsonStr = localStorage.getItem(key);
            var json = JSON.parse(jsonStr);
            if (json.name == goodsName) {
                goodsNum = json.num;
                goodsNum++;
                isFind = true;
                var msg = {
                    name: goodsName,
                    price: goodsPrice,
                    priceNum: priceNumber,
                    num: goodsNum,
                    src: goodsSrc
                };
                var nameStorage = goodsName;
                localStorage.removeItem(nameStorage);
                localStorage.setItem(nameStorage, JSON.stringify(msg));
                goodsName.value = "";
                goodsPrice.value = "";
                break;
            }
        }
        if (!isFind) {
            var goodsNum = 1;
            var msg = {
                name: goodsName,
                price: goodsPrice,
                priceNum: priceNumber,
                num: goodsNum,
                src: goodsSrc
            };
            var nameStorage = goodsName;
            localStorage.setItem(nameStorage, JSON.stringify(msg));
            goodsName.value = "";
            goodsPrice.value = "";
        }
    }
}

var buyNowBtn = document.getElementsByClassName("buyNowBtn");
for (var i = 0; i < buyNowBtn.length; i++) {
    buyNowBtn[i].onclick = function () {
        location.href = "../../success.html";
    }
}