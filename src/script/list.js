! function($) {
    const $goods_content = $('.body_wrap .goods_content');
    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;
    $.ajax({
        type: "GET",
        url: 'http://10.31.162.38/Mogujie/php/list.php',
    }).done(function(data) {
        let arr = JSON.parse(data);
        let strhtml = '';
        $.each(arr, function(index, value) {
            strhtml += `  
                <a href="detail.html?sid=${value.sid}" class="goods" target="_blank">
                    <div class="box"><img class="lazy" data-original="${value.url}" alt="">
                    </div>
                    <p>${value.title}</p>
                    <div class="price">
                        <span class="iconfont icon-renminbi"></span>
                        <span>${value.price}</span>
                        <span class="iconfont icon-renminbi"></span>
                        <span>${value.oldprice}</span>
                        <span class="iconfont icon-shoucang"></span>
                        <span>${value.sailnumber}</span>
                    </div>    
                    <p>找相似</p>
                </a>
               `;
        })
        $goods_content.html(strhtml);
        $(function() {
            $("img.lazy").lazyload({
                effect: "fadeIn"
            });
        });

        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.body_wrap .goods_content .goods').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    })

    $('.page').pagination({
        pageCount: 3,
        jump: true,
        coping: true,
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function(api) {
            console.log(api.getCurrent());
            $.ajax({
                url: 'http://10.31.162.38/Mogujie/php/list.php',
                data: {
                    page: api.getCurrent()
                },
            }).done(function(data) {
                let arr = JSON.parse(data);
                let strhtml = '';
                $.each(arr, function(index, value) {
                    strhtml += `  
                    <a href="detail.html?sid=${value.sid}" class="goods" target="_blank">
                        <div class="box"><img class="lazy" data-original="${value.url}" alt="">
                        </div>
                        <p>${value.title}</p>
                        <div class="price">
                            <span class="iconfont icon-renminbi"></span>
                            <span>${value.price}</span>
                            <span class="iconfont icon-renminbi"></span>
                            <span>${value.oldprice}</span>
                            <span class="iconfont icon-shoucang"></span>
                            <span>${value.sailnumber}</span>
                        </div>    
                        <p>找相似</p>
                    </a>
                   `;
                })
                $goods_content.html(strhtml);
                $(function() {
                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });

                array_default = [];
                array = [];
                prev = null;
                next = null;

                $('.body_wrap .goods_content .goods').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });

    //3.排序
    $('.body_wrap .goods_about li').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $('.body_wrap .goods_content').append(value);
        });
        return;
    });
    $('.body_wrap .goods_about li').eq(1).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price span').eq(1).html());
                next = parseFloat(array[j + 1].find('.price span').eq(1).html());

                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {

            $('.body_wrap .goods_content').append(value);
        });
    });
    $('.body_wrap .goods_about li').eq(2).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price span').eq(5).html());
                next = parseFloat(array[j + 1].find('.price span').eq(5).html());
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function(index, value) {
            console.log(value);
            $('.body_wrap .goods_content').append(value);
        });
    })
}(jQuery)