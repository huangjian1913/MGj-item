! function($) {
    const $itemlist = $('.cart_wrap .cart_list');

    function showlist(sid, num, color, size) { //sid：编号  num：数量
        $.ajax({
            url: 'http://10.31.162.38/Mogujie/php/alldata.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.cart_wrap nav:hidden').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.pic').find('img').attr('src', value.url);
                    $clonebox.find('.pic').find('p').html(value.title);
                    $clonebox.find('.pic').find('img').attr('sid', value.sid);
                    $clonebox.find('.list_message').children().eq(0).find('span').html(color);
                    $clonebox.find('.list_message').children().eq(1).find('span').html(size);
                    $clonebox.find('.list_price').children().eq(0).html(value.oldprice);
                    $clonebox.find('.list_price').children().eq(1).html(value.price);
                    $clonebox.find('.list_num').find('input').val(num);
                    //计算单个商品的价格
                    $clonebox.find('.list_total').find('p').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $itemlist.append($clonebox);
                    calcprice(); //计算总价
                }
            });

        });
    }

    //2.获取cookie渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum') && $.cookie('cookiecolor') && $.cookie('cookiesize')) {
        let arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
        let arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
        let arrcolor = $.cookie('cookiecolor').split(',');
        let arrsize = $.cookie('cookiesize').split(',');
        $.each(arrsid, function(index, value) {
            showlist(arrsid[index], arrnum[index], arrcolor[index], arrsize[index]);
        });
    }

    //3.计算总价--使用次数很多--函数封装
    function calcprice() {
        let $sum = 0; //商品的件数
        let $count = 0; //商品的总价
        $('.cart_wrap nav:visible').each(function(index, ele) {
            if ($(ele).find('li input:eq(0)').prop('checked')) { //复选框勾选
                $sum += parseInt($(ele).find('li input:eq(1)').val());
                $count += parseFloat($(ele).find('.list_total p').html());
            }
        });
        $('.cart_footer p').eq(4).find('span').html($sum);
        $('.cart_footer p').eq(5).find('span').html($count.toFixed(2));
    }

    //4.全选
    $('.allsel').on('change', function() {
        $('.cart_wrap nav:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calcprice(); //计算总价
        if ($(this).prop('checked')) {
            $('.cart_footer p:eq(6)').css({
                background: 'red',
            })
        } else {
            $('.cart_footer p:eq(6)').css({
                background: '#999',
            })
        }

    });
    //事件委托
    let $inputs = $('.cart_wrap nav:visible').find(':checkbox');
    $('.cart_list').on('change', $inputs, function(ev) {
        //$(this):被委托的元素，checkbox
        if ($('.cart_wrap nav:visible').find(':checkbox').length === $('.cart_wrap nav:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calcprice(); //计算总价
        // console.log($('.cart_wrap nav:visible').find('input:checked').size() >= 1);
        // console.log($('.cart_wrap nav:visible').find('input:checked').size() === 0);
        if ($('.cart_wrap nav:visible').find('input:checked').size() >= 1) {
            $('.cart_footer p:eq(6)').css({
                background: 'red',
            })
        } else if ($('.cart_wrap nav:visible').find('input:checked').size() === 0) {
            $('.cart_footer p:eq(6)').css({
                background: '#999',
            })
        }
    });

    //5.数量的改变
    //计算单价
    $('.list_num input').on('change', function(ev) {
        ev = ev || window.event;
        let $evt = $(ev.target) || $(ev.srcElement);
        if ($evt.val() < 1) {
            $evt.val(1);
        }
        let $single_price = $evt.parents('li').find('.list_price').find('p').html()
        $evt.parents('li').find('.list_total').find('p').html(parseFloat($evt.val() * $single_price).toFixed(2));
        calcprice(); //计算总价
        setcookie($evt);
    });

    //将改变后的数量存放到cookie中
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    let arrcolor = [];
    let arrsize = [];

    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。
            arrcolor = $.cookie('cookiecolor').split(',');
            arrsize = $.cookie('cookiesize').split(',');
        } else {
            arrsid = [];
            arrnum = [];
            arrcolor = [];
            arrsize = [];
        }
    }
    //改变num，并且保存
    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('li').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('li').find('.list_num').find('input').val();
        $.cookie('cookienum', arrnum, 10);
    }


    //6.删除
    function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组
        let $index = -1; //删除的索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        arrcolor.splice($index, 1);
        arrsize.splice($index, 1);


        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        $.cookie('cookiecolor', arrcolor, { expires: 10, path: '/' });
        $.cookie('cookiesize', arrsize, { expires: 10, path: '/' });

    }
    $('li a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('nav').remove();
            delcookie($(this).parents('li').find('img').attr('sid'), arrsid);
            calcprice(); //计算总价
        }
    });

    $('.cart_footer p:eq(1)').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除选中的吗?')) {
            $('nav:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
            });
            calcprice(); //计算总价
        }
    });

}(jQuery)