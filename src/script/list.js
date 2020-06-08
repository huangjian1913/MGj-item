! function($) {
    const $goods_content = $('.body_wrap .goods_content');
    let array_default = []; //排序前的li数组
    let array = []; //排序中的数组
    let prev = null;
    let next = null;
    $.ajax({
        type: "GET",
        url: 'http://10.31.162.38/Mogujie/php/list.php',
        // dataType: 'json',
    }).done(function(data) {
        let arr = JSON.parse(data);
        let strhtml = '';
        // console.log(arr);
        $.each(arr, function(index, value) {
            strhtml += `  
                <a href="detail.html" class="goods" target="_blank">
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
        $(function() { //和拼接的元素放在一起。
            $("img.lazy").lazyload({
                effect: "fadeIn" //图片显示方式
            });
        });

        array_default = []; //  
        array = []; //排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.body_wrap .goods_content .goods').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    })

    $('.page').pagination({
        pageCount: 3, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        coping: true, //是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取的页码给后端
            $.ajax({
                url: 'http://10.31.162.38/Mogujie/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                // dataType: 'json',
            }).done(function(data) {
                let arr = JSON.parse(data);
                let strhtml = '';
                // console.log(arr);
                $.each(arr, function(index, value) {
                    strhtml += `  
                    <a href="detail.html" class="goods" target="_blank">
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
                $(function() { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });

                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;

                //将页面的li元素加载到两个数组中
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
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        //这里能够省略empty
        //append在追加的时候，如果追加的是jquery的元素对象，而jquery元素对象在你追加的元素中存在，直接取出存在的元素，从后面追加。
        //如果追加的是内容结构，依然和appendChild一样，后面继续追加。
        $.each(array, function(index, value) {
            // console.log(value); //n.fn.init [li, context: li]
            $('.body_wrap .goods_content').append(value);
        });
    });
    $('.body_wrap .goods_about li').eq(2).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price span').eq(5).html());
                next = parseFloat(array[j + 1].find('.price span').eq(5).html());
                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        $.each(array, function(index, value) {
            console.log(value);
            $('.body_wrap .goods_content').append(value);
        });
    })
}(jQuery)