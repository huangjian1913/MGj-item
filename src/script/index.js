! function() {
    const aboutus = document.querySelector('.header-nav-content .header-aboutus');
    const aboutusbox = document.querySelector('.header-nav-content .header-abouts-box');
    const mulu = document.querySelector('.header-wrap .mulu span')
    const mululist = document.querySelector('.header-wrap .mulu .mulu-list');
    const advertising = document.querySelector('.advertising');
    const deletebtn = document.querySelector('.advertising .content .delete');

    aboutus.onmousemove = aboutusbox.onmousemove = function() {
        aboutusbox.style.display = "block";
    }
    aboutus.onmouseout = aboutusbox.onmouseout = function() {
        aboutusbox.style.display = "none";
    }
    mulu.onmousemove = mululist.onmousemove = function() {
        mululist.style.display = "block";
    }
    mulu.onmouseout = mululist.onmouseout = function() {
        mululist.style.display = "none";
    }
    deletebtn.onclick = function() {
        advertising.style.display = "none";
    }
}()

//蘑菇街搜索引擎： https: //list.mogu.com/search?cKey=pc-search-entry&_version=8388605&searchKey=bbb&callback=hehe&_=1591427175916
const search = document.querySelector('.header .header-wrap .search input');
const search_box = document.querySelector('.header .header-wrap .search .search_box');

function database(data) {
    let arr = data.result.list;
    arr.shift();
    let strhtml = '';
    for (let value of arr) {
        strhtml += `<li>
        <a href="https://list.mogu.com/search/goods?q=${value.query}&title=${value.query}">${value.query}</a>
        </li>`
        if (value.query == undefined) {
            strhtml = '';
        }
    }
    search_box.innerHTML = strhtml;
}
search.oninput = function() {
    let cs = document.querySelector('#hehe');
    if (cs) {
        document.body.removeChild(cs);
    }
    let cScript = document.createElement('script');
    cScript.id = 'hehe';
    cScript.src = 'https://list.mogu.com/search?cKey=pc-search-entry&_version=8388605&searchKey=' + this.value + '&callback=database&_=1591427175916';
    document.body.appendChild(cScript);
}


! function() {
    window.onload = function() {
        const djs_hour = document.querySelector(".countdown .hour");
        const djs_min = document.querySelector(".countdown .min");
        const djs_second = document.querySelector(".countdown .second");

        setInterval(function() {
            var futureTime = new Date(2020, 5, 6, 18, 0, 0); // 未来时间
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
}()

! function($) {
    const $banner = $('.body_wrap .outerbox .bannerbox ul');
    let index = 1;
    let timer = null;

    function ullunbo1() {
        if (index == $banner.length) {
            index = 0;
        }
        $banner.eq(index).animate({
            opacity: 1,
        }).siblings('.body_wrap .outerbox .bannerbox ul').animate({
            opacity: 0,
        });
    }
    timer = setInterval(function() {
        ullunbo1();
        index++;
    }, 2000)
    $banner.hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(function() {
            ullunbo1();
            index++;
        }, 2000);
    })
}(jQuery)

! function($) {
    const $bannerbox = $('.body_wrap .girl_close .bannerpic');
    const $btnleft = $('.body_wrap .girl_close .bannerpic>p:eq(0)');
    const $btnright = $('.body_wrap .girl_close .bannerpic>p:eq(1)');
    const $ulbox = $('.body_wrap .girl_close .bannerpic>ul');
    const $liboxs = $('.body_wrap .girl_close .bannerpic>ul>li');
    let index = 0;
    let timer = null;
    let $clonebox1 = $liboxs.eq(0).clone(true, true);
    let $clonebox2 = $liboxs.eq(1).clone(true, true);
    let $clonebox3 = $liboxs.eq(2).clone(true, true);
    let $clonebox4 = $liboxs.eq(3).clone(true, true);
    let $bannerwidth = $bannerbox.width(); //追加
    $ulbox.append($clonebox1).append($clonebox2).append($clonebox3).append($clonebox4).css({
        width: $bannerwidth * 3
    });
    $bannerbox.hover(function() {
        $btnright.show();
        $btnleft.show();
        clearInterval(timer);
    }, function() {
        $btnright.hide();
        $btnleft.hide();
        timer = setInterval(function() {
            tabswitch();
        }, 2000)
    })


    $btnright.on('click', function() {
        tabswitch();
    })
    $btnleft.on('click', function() {
        index -= 2;
        tabswitch();
    })

    function tabswitch() {
        index++;
        if (index > 2) {
            $ulbox.css({
                left: 0,
            })
            index = 1;
        }
        if (index < 0) {
            $ulbox.css({
                left: -$bannerwidth * 2,
            })
            index = 1;
        }
        $ulbox.stop(true).animate({
            left: -$bannerwidth * index,
        })
    }
    timer = setInterval(function() {
        tabswitch();
    }, 2000)
}(jQuery)