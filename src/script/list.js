const goods_content = document.querySelector('.body_wrap .goods_content');
console.log(goods_content);
$ajax({
    url: 'http://10.31.162.38/Mogujie/php/alldata.php',
}).then(function(data) {
    let arr = JSON.parse(data);
    let strhtml = '';
    for (let value of arr) {
        strhtml += `  
        <div class="goods">
            <div class="box"><img src="${value.url}" alt="">
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
        </div>`;
    }
    goods_content.innerHTML = strhtml;
});