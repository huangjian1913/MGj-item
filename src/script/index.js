// const head_aboutus = document.querySelector('.header-aboutus');
// const head_aboutusbox = document.querySelector('.header-aboutus-box');
// head_aboutus.onmouseover = function() {
//     head_aboutusbox.style.display = "block";
// }

window.onload = function() {
    const djs_hour = document.querySelector(".countdown .hour");
    const djs_min = document.querySelector(".countdown .min");
    const djs_second = document.querySelector(".countdown .second");

    setInterval(function() {
        var futureTime = new Date(2020, 5, 4, 18, 0, 0); // 未来时间
        var now = Date.now();
        var time = futureTime - now; // 需要倒计时的时间 毫秒
        var s = time / 1000; // 将毫秒转换成秒
        var day = Math.floor(s / (60 * 60 * 24)); // 将秒换算成天
        var hour = Math.floor(s % 86400 / 3600); // 计算剩余小时
        var min = Math.floor(s % 3600 / 60); // 计算分钟
        var sec = Math.floor(s % 60); // 获得秒
        // djs.innerHTML = '距离春节假期来临 还剩:' + day + '天' + hour + '时' + min + '分' + sec + '秒';
        djs_hour.innerHTML = hour;
        djs_min.innerHTML = min;
        djs_second.innerHTML = sec;
    }, 1000);

}