! function() {
    let id = location.search.substring(1).split('=')[1];
    const bigpic = document.querySelector('.detailpart .detail_left .bigpicbox img');
    const smallpics = document.querySelectorAll('.detailpart .detail_left .smallbox img');
    const zoompic = document.querySelector('.detailpart .detail_left .zoombox img');
    const number = document.querySelector('.detailpart .numbox span');
    const cartbtn = document.querySelector('.detailpart .detail_mid .addcart .add');
    const storepic = document.querySelector('.storepic .bigpic img');
    const title = document.querySelector('.detailpart .detail_mid p');
    const message = document.querySelectorAll('.detailpart .detail_mid .message p');
    const oldprice = message[0].querySelector('span');
    const price = message[1].querySelector('span');
    const sailnum = message[2].querySelectorAll('span')[1];

    $ajax({
        url: 'http://10.31.162.38/Mogujie/php/detail.php',
        data: {
            sid: id,
        }
    }).then(function(data) {
        let obj = JSON.parse(data);
        bigpic.src = obj.url;
        zoompic.src = bigpic.src;
        smallpics[0].src = obj.url1;
        smallpics[1].src = obj.url2;
        smallpics[2].src = obj.url3;
        smallpics[3].src = obj.url4;
        smallpics[4].src = obj.url;
        title.innerHTML = obj.title;
        oldprice.innerHTML = '¥' + obj.oldprice;
        price.innerHTML = '¥' + obj.price;
        sailnum.innerHTML = obj.sailnumber;
        storepic.src = obj.piclisturl;
        for (let i = 0; i < smallpics.length; i++) {
            smallpics[i].onmousemove = function() {
                bigpic.src = this.src;
                zoompic.src = bigpic.src;
            }
        }
    })
    let arrsid = [];
    let arrnum = [];
    let arrcolor = [];
    let arrsize = [];

    function cookievalue() {
        if (cookie.get('cookiesid') && cookie.get('cookienum') && cookie.get('cookiecolor') && cookie.get('cookiesize')) {
            arrsid = cookie.get('cookiesid').split(',');
            arrnum = cookie.get('cookienum').split(',');
            arrcolor = cookie.get('cookiecolor').split(',');
            arrsize = cookie.get('cookiesize').split(',');
        } else {
            arrsid = [];
            arrnum = [];
            arrcolor = [];
            arrsize = [];
        }
    }
    //通过判断确认是否是第一次加入购物车
    cartbtn.addEventListener('click', function() {
        let color = document.querySelector('.detailpart .color .color_select .active');
        let size = document.querySelector('.detailpart .size .size_select .active');

        if (color && size) {
            cookievalue();

            //获取当前商品的id
            if (arrsid.indexOf(id) !== -1 && arrcolor[arrsid.indexOf(id)] === color.innerHTML && arrsize[arrsid.indexOf(id)] === size.innerHTML) {
                let num = parseInt(arrnum[arrsid.indexOf(id)]) + parseInt(number.innerHTML);
                arrnum[arrsid.indexOf(id)] = num;
                cookie.set('cookienum', arrnum, 10);

            } else {
                arrsid.push(id);
                let num = parseInt(number.innerHTML);
                arrnum.push(num);
                arrcolor.push(color.innerHTML);
                arrsize.push(size.innerHTML);
                cookie.set('cookiesid', arrsid, 10);
                cookie.set('cookienum', arrnum, 10);
                cookie.set('cookiecolor', arrcolor, 10);
                cookie.set('cookiesize', arrsize, 10);
            }
            alert('商品成功加入购物车');
        }
    })
}()

! function() {
    const $colors = $('.detailpart .color .color_select .xuxian').siblings('p');
    const $sizes = $('.detailpart .size .size_select p');
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
    let flag = null;
    cartbtn.addEventListener('click', function(e) {
        if ($colors.hasClass('active') && $sizes.hasClass('active')) {
            flag = true;
        } else {
            flag = false;
        }
        // } else if ($colors.hasClass('active') == false || $sizes.hasClass('active') == false) {
        //     flag = false;
        // }
        if (flag) {
            // 1、鼠标坐标；2、购物车终点坐标；3、最高点坐标（自己定）
            e = e || window.event
            var x1 = e.clientX,
                y1 = e.clientY + scrollY,
                x2 = shopcart.offsetLeft,
                y2 = shopcart.offsetTop,
                x3 = x2 - 400,
                y3 = y2 - 400;
            // 根据数学公式计算抛物线三个系数（这里不用管，拿来用就行）
            var a = -((y2 - y3) * x1 - (x2 - x3) * y1 + x2 * y3 - x3 * y2) / ((x2 - x3) * (x1 - x2) * (x1 - x3));
            var b = ((y2 - y3) * x1 * x1 + x2 * x2 * y3 - x3 * x3 * y2 - (x2 * x2 - x3 * x3) * y1) / ((x2 - x3) * (x1 - x2) * (x1 - x3));
            var c = ((x2 * y3 - x3 * y2) * x1 * x1 - (x2 * x2 * y3 - x3 * x3 * y2) * x1 + (x2 * x2 * x3 - x2 * x3 * x3) * y1) / ((x2 - x3) * (x1 - x2) * (x1 - x3));


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
                }
            }, 60)
        }
    }, true)
}()

! function($) {
    const $scale = $('.detailpart .detail_left');
    const $bigpicbox = $('.detailpart .detail_left .bigpicbox');
    const $zoom = $('.detailpart .detail_left .bigpicbox .zoom');
    const $bigpic = $('.detailpart .detail_left .bigpicbox img');
    const $zoombox = $('.detailpart .detail_left .zoombox');
    const $zoompic = $('.detailpart .detail_left .zoombox img');
    $bigpicbox.hover(function() {
        $zoom.css('display', 'block');
        $zoombox.css('display', 'block');
        $zoom.css({
            width: $bigpicbox.outerWidth() * $zoombox.outerWidth() / $zoompic.outerWidth(),
            height: $bigpicbox.outerHeight() * $zoombox.outerHeight() / $zoompic.outerHeight()
        });
        let $bili = $zoompic.outerWidth() / $bigpicbox.outerWidth();
        $(this).on('mousemove', function(e) {
            let leftvalue = e.pageX - $scale.offset().left - $zoom.outerWidth() / 2;
            let topvalue = e.pageY - $scale.offset().top - $zoom.outerHeight() / 2;
            if (leftvalue < 0) {
                leftvalue = 0
            } else if (leftvalue >= $bigpicbox.outerWidth() - $zoom.outerWidth()) {
                leftvalue = $bigpicbox.outerWidth() - $zoom.outerWidth();
            }

            if (topvalue < 0) {
                topvalue = 0
            } else if (topvalue >= $bigpicbox.outerHeight() - $zoom.outerHeight()) {
                topvalue = $bigpicbox.outerHeight() - $zoom.outerHeight();
            }
            $zoom.css({
                left: leftvalue,
                top: topvalue
            });
            $zoompic.css({
                left: -$bili * leftvalue,
                top: -$bili * topvalue
            });
        });
    }, function() {
        $zoom.css('display', 'none');
        $zoombox.css('display', 'none');
    });
}(jQuery)