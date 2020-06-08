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
            var futureTime = new Date(2020, 5, 8, 24, 0, 0); // 未来时间
            var now = Date.now();
            var time = futureTime - now; // 需要倒计时的时间 毫秒
            var s = time / 1000; // 将毫秒转换成秒
            var day = Math.floor(s / (60 * 60 * 24)); // 将秒换算成天
            var hour = Math.floor(s % 86400 / 3600); // 计算剩余小时
            var min = Math.floor(s % 3600 / 60); // 计算分钟
            var sec = Math.floor(s % 60); // 获得秒
            // djs.innerHTML = '距离春节假期来临 还剩:' + day + '天' + hour + '时' + min + '分' + sec + '秒';
            if (hour < 10) { hour = '0' + hour; }
            if (min < 10) { min = '0' + min; }
            if (sec < 10) { sec = '0' + sec; }
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

}(jQuery)

! function($) {
    const $render1 = $('.body_wrap .outerbox .bannerbox ul li');
    const $render2 = $('.body_wrap .girl_close .bannerpic ul li');
    const $render3 = $('.girl_shoebag .right_goods .hot_goods a');
    const $render4 = $('.boy_goods .right_goods .hot_goods a');
    const $render5 = $('.girl_underwear .right_goods .hot_goods a');
    const $render6 = $('.home_textiles .right_goods .hot_goods a');
    const $render7 = $('.child_goods .right_goods .hot_goods a');
    const $render8 = $('.girl_shoebag .center_goods ul li');
    $.ajax({
        url: 'http://10.31.162.38/Mogujie/php/alldata.php',
        async: false,
        success: function(data) {
            let arr = JSON.parse(data);
            // console.log($render1.children());
            let strhtml1 = '';
            let strhtml2 = '';
            let strhtml3 = '';
            let strhtml4 = '';
            let strhtml5 = '';
            $.each(arr, function(index, value) {
                if (index < 8) {
                    // console.log($render1.eq(index).children().eq(2));
                    $render1.eq(index).children(0).children().attr('data-original', value.url);
                    $render1.eq(index).children().eq(1).html(value.title);
                    $render1.eq(index).children().eq(2).html('¥' + value.price);
                    $render1.eq(index).children().eq(3).html('¥' + value.oldprice);
                }
                if (index >= 8 && index < 16) {
                    // console.log($render2.eq(index - 8));
                    $render2.eq(index - 8).html(`<div class="pic"><img class="lazy" data-original="${value.url}" alt=""></div>
                    <p>${value.title}</p>
                    <span class="span1">¥${value.price}</span>`);
                }
                if (index >= 16 && index < 20) {
                    $render3.eq(index - 20).html(`<img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>`)
                }
                if (index >= 20 && index < 24) {
                    $render4.eq(index - 24).html(`<img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>`)
                }
                if (index >= 24 && index < 28) {
                    $render5.eq(index - 28).html(`<img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>`)
                }
                if (index >= 28 && index < 32) {
                    $render6.eq(index - 32).html(`<img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>`)
                }
                if (index >= 32 && index < 36) {
                    $render7.eq(index - 36).html(`<img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>`)
                }
                if (index >= 36 && index < 42) {
                    strhtml1 += `<a href=""><img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>
                </a>`;
                }
                if (index >= 42 && index < 48) {
                    strhtml2 += `<a href=""><img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>
                </a>`;
                }
                if (index >= 48 && index < 54) {
                    strhtml3 += `<a href=""><img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>
                </a>`;
                }
                if (index >= 54 && index < 60) {
                    strhtml4 += `<a href=""><img class="lazy" data-original="${value.url}" alt="">
                    <p>${value.title}</p>
                    <span>¥${value.price}</span>
                </a>`;
                }
                if (index >= 60 && index <= 65) {
                    strhtml5 += `<a href=""><img class="lazy" data-original="${value.url}" alt="">
                        <p>${value.title}</p>
                        <span>¥${value.price}</span>
                    </a>`
                }
            })
            $render8.eq(0).html(strhtml1);
            $render8.eq(1).html(strhtml2);
            $render8.eq(2).html(strhtml3);
            $render8.eq(3).html(strhtml4);
            $render8.eq(4).html(strhtml5);
            $render8.eq(5).html(strhtml1);
            $(function() { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });

            function lunbo1() {
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
            }
            lunbo1();

            function lunbo2() {
                const $lunbobox = $('.girl_shoebag .center_goods');
                const $lunboul = $('.girl_shoebag .center_goods ul');
                const $btnsp = $('.girl_shoebag .center_goods .btnsbox p');
                let $index = 0;
                let $timer = null;

                function tabswitch() {
                    let $lunbowidth = $lunboul.children().eq(0).width();
                    $index++;
                    if ($index === 6) {
                        $index = 1;
                        $lunboul.css({
                            left: 0,
                        })
                    }
                    if ($index === 5) {
                        $btnsp.eq(0).addClass('active').siblings('.girl_shoebag .center_goods .btnsbox p').removeClass('active');
                    } else {
                        $btnsp.eq($index).addClass('active').siblings('.girl_shoebag .center_goods .btnsbox p').removeClass('active');
                    }
                    $lunboul.stop(true).animate({
                        left: -$lunbowidth * $index,
                    })
                }
                $btnsp.on('click', function() {
                    $index = $(this).index() - 1;
                    tabswitch();
                })
                $timer = setInterval(function() {
                    tabswitch();
                }, 2000)
                $lunbobox.hover(function() {
                    clearInterval($timer);
                }, function() {
                    $timer = setInterval(function() {
                        tabswitch();
                    }, 2000)
                })
            }
            lunbo2();
        }
    })
}(jQuery)