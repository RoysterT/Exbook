console.log("11")
var loginStatus = sessionStorage.getItem("loginStatus");
var userNameText = document.getElementById("userNameText");
var isLogin = document.getElementById("isLogin");
var noLogin = document.getElementById("noLogin");
if (loginStatus == "true") {
    var userName = sessionStorage.getItem("user");
    userNameText.innerHTML = userName;
    noLogin.style.display = "none";
    isLogin.style.display = "block";
}
else {
    noLogin.style.display = "block";
    isLogin.style.display = "none";
}
userNameText.onclick = function () {
    sessionStorage.removeItem("loginStatus");
    sessionStorage.setItem("loginStatus", false);
}