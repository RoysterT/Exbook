window.onload = function () {
    // 当用户进入购物车页面时将全选的checkBox取消勾选，我也不知道为啥会默认勾选上
    document.getElementsByClassName("choseAll")[0].checked=false;
    loadCart();

    function loadCart() {
        if (localStorage.length != 0) {
            isCartEmpty();
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) != "history") {
                    var itemHtml = $('#temp').html();
                    var key = localStorage.key(i);
                    var jsonStr = localStorage.getItem(key);
                    var json = JSON.parse(jsonStr);
                    itemHtml = itemHtml.replace('#name#', json.name);
                    itemHtml = itemHtml.replace('#price#', json.price);
                    itemHtml = itemHtml.replace('#num#', json.num);
                    itemHtml = itemHtml.replace('#url#', json.src);
                    itemHtml = itemHtml.replace('#totalPrice#', priceCount(json.priceNum, json.num) + ".00");
                    var cartHtml = document.getElementById("cartContent").innerHTML;
                    cartHtml += itemHtml;
                    document.getElementById("cartContent").innerHTML = cartHtml;
                }
            }
        }
    }

// 判断是否为空
    function isCartEmpty() {
        var cartIsEmpty = document.getElementsByClassName("cartIsEmpty")[0];
        choseAllCheckedBox = document.getElementsByClassName("choseAll")[0];
        if (localStorage.length == 0) {
            cartIsEmpty.style.display = 'block';
            choseAllCheckedBox.checked = false;
        } else {
            cartIsEmpty.style.display = 'none';
            choseAllCheckedBox.checked = true;
        }
    }

// 计算单个总价
    function priceCount(price, num) {
        return price * num;
    }

// 点击checkBox
    var checkBox = document.getElementsByClassName("checkBox");
    for (var i = 0; i < checkBox.length; i++) {
        checkBox[i].onclick = function () {
            totalPriceCount();
            // 判断是否已全选
            isSelectAll = true;
            for (j = 0; j < checkBox.length; j++) {
                if (checkBox[j].checked == false) {
                    isSelectAll = false;
                    break;
                }
            }
            choseAllCheckedBox = document.getElementsByClassName("choseAll")[0];
            if (isSelectAll) {
                choseAllCheckedBox.checked = true;
            } else {
                choseAllCheckedBox.checked = false;
            }
        }
    }

// 加
    var itemAdd = document.getElementsByClassName("item-add");
    for (var i = 0; i < itemAdd.length; i++) {
        itemAdd[i].onclick = function add() {
            var number = this.parentNode.getElementsByClassName("item-number")[0].value;
            var goodsName = this.parentNode.parentNode.getElementsByClassName("item-info-text")[0].innerHTML;
            var goodsPrice = this.parentNode.parentNode.getElementsByClassName("item-price")[0].innerHTML;
            var priceNumber = parseFloat(goodsPrice.substring(1));
            var goodsSrc = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].src;
            number++;
            this.parentNode.getElementsByClassName("item-number")[0].value = number;
            this.parentNode.parentNode.getElementsByClassName("checkBox")[0].checked = true;
            goodsNum = number;
            var msg = {
                name: goodsName,
                price: goodsPrice,
                priceNum: priceNumber,
                num: goodsNum,
                src: goodsSrc
            };
            localStorage.removeItem(goodsName);
            localStorage.setItem(goodsName, JSON.stringify(msg))
            this.parentNode.parentNode.getElementsByClassName("item-total-price")[0].innerHTML = "&yen;" + priceCount(priceNumber, number) + ".00";
            totalPriceCount();
        }
    }

// 减
    var itemSub = document.getElementsByClassName("item-sub");
    for (var i = 0; i < itemSub.length; i++) {
        itemSub[i].onclick = function add() {
            var number = this.parentNode.getElementsByClassName("item-number")[0].value;
            if (number > 1) {
                var goodsName = this.parentNode.parentNode.getElementsByClassName("item-info-text")[0].innerHTML;
                var goodsPrice = this.parentNode.parentNode.getElementsByClassName("item-price")[0].innerHTML;
                var priceNumber = parseFloat(goodsPrice.substring(1));
                var goodsSrc = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].src;
                number--;
                this.parentNode.getElementsByClassName("item-number")[0].value = number;
                this.parentNode.parentNode.getElementsByClassName("checkBox")[0].checked = true;
                goodsNum = number;
                var msg = {
                    name: goodsName,
                    price: goodsPrice,
                    priceNum: priceNumber,
                    num: goodsNum,
                    src: goodsSrc
                };
                localStorage.removeItem(goodsName);
                localStorage.setItem(goodsName, JSON.stringify(msg))
                this.parentNode.parentNode.getElementsByClassName("item-total-price")[0].innerHTML = "&yen;" + priceCount(priceNumber, number) + ".00";
            } else {
                var flag = confirm("是否确认删除商品？");
                if (flag) {
                    $(this).parent().parent().remove();
                    var goodsName = this.parentNode.parentNode.getElementsByClassName("item-info-text")[0].innerHTML;
                    localStorage.removeItem(goodsName);
                    isCartEmpty()
                }
            }
            totalPriceCount();
        }
    }

// 修改输入框中数量
    var itemInput = document.getElementsByClassName("item-number");
    for (var i = 0; i < itemInput.length; i++) {
        itemInput[i].oninput = function () {
            var goodsName = this.parentNode.parentNode.getElementsByClassName("item-info-text")[0].innerHTML;
            var goodsPrice = this.parentNode.parentNode.getElementsByClassName("item-price")[0].innerHTML;
            var priceNumber = parseFloat(goodsPrice.substring(1));
            var goodsSrc = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].src;
            this.parentNode.parentNode.getElementsByClassName("checkBox")[0].checked = true;
            var number = this.value;
            var goodsNum = number;
            var msg = {
                name: goodsName,
                price: goodsPrice,
                priceNum: priceNumber,
                num: goodsNum,
                src: goodsSrc
            };
            localStorage.removeItem(goodsName);
            localStorage.setItem(goodsName, JSON.stringify(msg))
            this.parentNode.parentNode.getElementsByClassName("item-total-price")[0].innerHTML = "&yen;" + priceCount(priceNumber, number) + ".00";
            totalPriceCount();
        }
    }

// 计算总金额
    function totalPriceCount() {
        var totalAmount = 0;
        var totalPrice = 0;
        for (var j = 0; j < checkBox.length; j++) {
            if (checkBox[j].checked) {
                totalAmount += parseInt(checkBox[j].parentNode.parentNode.getElementsByClassName("item-number")[0].value);
                totalPrice += parseInt(checkBox[j].parentNode.parentNode.getElementsByClassName("item-total-price")[0].innerHTML.substring(1));
            }
        }
        var titlePrice = document.getElementById("titlePrice");
        titlePrice.innerHTML = totalPrice + ".00";
        var titleAmount = document.getElementById("titleAmount");
        titleAmount.innerHTML = totalAmount;
    }

// 删除
    $('.itemWrapper').on('click', '.del-btn', function () {
        var flag = confirm("是否确认删除商品？");
        if (flag) {
            $(this).parent().parent().remove();
            var goodsName = this.parentNode.parentNode.getElementsByClassName("item-info-text")[0].innerHTML;
            localStorage.removeItem(goodsName);
            isCartEmpty();
        }
        totalPriceCount();
    })

// 结算
    var submitButton = document.getElementById("submitButton");
    submitButton.onclick = function () {
        var choseNum = 0;
        var checkBox = document.getElementsByClassName("checkBox");
        for (var i = 0; i < checkBox.length; i++) {
            if (checkBox[i].checked == true) {
                choseNum++;
                var goodsName = checkBox[i].parentNode.parentNode.getElementsByClassName("item-info-text")[0].innerHTML;
                localStorage.removeItem(goodsName);
            }
        }
        if (choseNum) {
            location.href = "./success.html";
        }
    }

// 清空购物车
    var clearMyCart = document.getElementById("clearMyCart");
    clearMyCart.onclick = function () {
        localStorage.clear();
        location.href = "./cart.html";
    }

// 全选
    var selectAll = document.getElementsByClassName("select-all")[0];
    isSelectAll = false;
    selectAll.onclick = function () {
        this.getElementsByClassName("choseAll")[0].checked = !isSelectAll;
        var checkBox = document.getElementsByClassName("checkBox");
        for (var i = 0; i < checkBox.length; i++) {
            checkBox[i].checked = !isSelectAll;
        }
        isSelectAll = !isSelectAll;
        totalPriceCount();
    }
    // localStorage.getItem();

}