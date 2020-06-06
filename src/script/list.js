! function() {
    const $goods_content = $('.body_wrap .goods_content');
    $.ajax({
        url: 'http://10.31.162.38/Mogujie/php/alldata.php',
        success: (function(data) {
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
                </a>`;
            })
            $goods_content.html(strhtml);
            // $(function() { //和拼接的元素放在一起。
            $("img.lazy").lazyload({
                effect: "fadeIn" //图片显示方式
            });
            // });
        })
    });

}()