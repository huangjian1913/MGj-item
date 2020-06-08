! function() {
    const bigpics = document.querySelectorAll('.detailpart .detail_left .bigpicbox');
    const smallpics = document.querySelectorAll('.detailpart .detail_left .smallbox');
    for (let i = 0; i < smallpics.length; i++) {
        smallpics[i].onmousemove = function() {
            for (let j = 0; j < bigpics.length; j++) {
                bigpics[j].style.display = "none";
            }
            bigpics[i].style.display = "block";
        }
    }
}()

! function() {
    const $cartbtn = $('.detailpart .detail_mid .addcart .add');
    const $number = $('.detailpart .numbox span');
    const $colors = $('.detailpart .color .color_select p');
    const $sizes = $('.detailpart .size .size_select p');
    let flag = null;

    $colors.on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active').siblings('.detailpart .color .color_select p').removeClass('active');
        }
    })
    $sizes.on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active').siblings('.detailpart .size .size_select p').removeClass('active');
        }
    })

    // }(jQuery)
    //购物车抛物线
    // ! function() {
    const plus = document.querySelectorAll('.detailpart .number p')[1];
    const minus = document.querySelectorAll('.detailpart .number p')[0];
    const number = document.querySelector('.detailpart .numbox span');
    const cartbtn = document.querySelector('.detailpart .detail_mid .addcart .add');
    const shopcart = document.querySelector('.header .header-wrap .gouwuche');
    plus.onclick = function() {
        number.innerHTML = parseInt(number.innerHTML) + 1;
    }
    minus.onclick = function() {
            if (parseInt(number.innerHTML) <= 1) {
                number.innerHTML = 1;
            } else {
                number.innerHTML = parseInt(number.innerHTML) - 1;
            }
        }
        // flag = true;
    cartbtn.addEventListener('click', function(e) {
        if ($colors.hasClass('active') && $sizes.hasClass('active')) {
            flag = true;
        } else if ($colors.hasClass('active') == false || $sizes.hasClass('active') == false) {
            flag = false;
        }

        // 1、鼠标坐标；2、购物车终点坐标；3、最高点坐标（自己定）
        e = e || window.event
        var x1 = e.clientX,
            y1 = e.clientY + scrollY,
            x2 = shopcart.offsetLeft,
            y2 = shopcart.offsetTop,
            x3 = x2 - 400,
            y3 = y2 - 400
            // 根据数学公式计算抛物线三个系数（这里不用管，拿来用就行）
        var a = -((y2 - y3) * x1 - (x2 - x3) * y1 + x2 * y3 - x3 * y2) / ((x2 - x3) * (x1 - x2) * (x1 - x3));
        var b = ((y2 - y3) * x1 * x1 + x2 * x2 * y3 - x3 * x3 * y2 - (x2 * x2 - x3 * x3) * y1) / ((x2 - x3) * (x1 - x2) * (x1 - x3));
        var c = ((x2 * y3 - x3 * y2) * x1 * x1 - (x2 * x2 * y3 - x3 * x3 * y2) * x1 + (x2 * x2 * x3 - x2 * x3 * x3) * y1) / ((x2 - x3) * (x1 - x2) * (x1 - x3));
        if (flag) {
            flag = false;
            // 创建一个div，添加到页面上
            var div = document.createElement('div')
            div.className = 'cart_active';
            div.innerHTML = number.innerHTML;
            document.body.appendChild(div)
                // 让div沿着抛物线运动
                // 先给div一个初始坐标
            div.style.left = x1 + 'px'
            div.style.top = y1 + 'px'
            var timer = setInterval(() => {
                // 横坐标匀速运动
                x1 += 10
                    // 纵坐标按照抛物线公式代入x1计算就行
                y1 = a * x1 * x1 + b * x1 + c
                div.style.left = x1 + 'px'
                div.style.top = y1 + 'px'
                if (x1 >= x2) {
                    // 清除定时器
                    clearInterval(timer)
                        // div移除
                    div.remove()
                        //购物车数量++
                        // number.innerHTML = Number(shopNum.innerHTML) + 1
                    flag = true;
                }
            }, 60)
        }
    }, true)
}()