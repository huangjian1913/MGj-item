"use strict";!function(i){var t=i(".body_wrap .goods_content"),s=[],e=[],p=null,c=null;i.ajax({type:"GET",url:"http://10.31.162.38/Mogujie/php/list.php"}).done(function(n){var a=JSON.parse(n),o="";i.each(a,function(n,a){o+='  \n                <a href="detail.html?sid='+a.sid+'" class="goods" target="_blank">\n                    <div class="box"><img class="lazy" data-original="'+a.url+'" alt="">\n                    </div>\n                    <p>'+a.title+'</p>\n                    <div class="price">\n                        <span class="iconfont icon-renminbi"></span>\n                        <span>'+a.price+'</span>\n                        <span class="iconfont icon-renminbi"></span>\n                        <span>'+a.oldprice+'</span>\n                        <span class="iconfont icon-shoucang"></span>\n                        <span>'+a.sailnumber+"</span>\n                    </div>    \n                    <p>找相似</p>\n                </a>\n               "}),t.html(o),i(function(){i("img.lazy").lazyload({effect:"fadeIn"})}),s=[],e=[],c=p=null,i(".body_wrap .goods_content .goods").each(function(n,a){e[n]=i(this),s[n]=i(this)})}),i(".page").pagination({pageCount:3,jump:!0,coping:!0,prevContent:"上一页",nextContent:"下一页",homePage:"首页",endPage:"尾页",callback:function(n){console.log(n.getCurrent()),i.ajax({url:"http://10.31.162.38/Mogujie/php/list.php",data:{page:n.getCurrent()}}).done(function(n){var a=JSON.parse(n),o="";i.each(a,function(n,a){o+='  \n                    <a href="detail.html?sid='+a.sid+'" class="goods" target="_blank">\n                        <div class="box"><img class="lazy" data-original="'+a.url+'" alt="">\n                        </div>\n                        <p>'+a.title+'</p>\n                        <div class="price">\n                            <span class="iconfont icon-renminbi"></span>\n                            <span>'+a.price+'</span>\n                            <span class="iconfont icon-renminbi"></span>\n                            <span>'+a.oldprice+'</span>\n                            <span class="iconfont icon-shoucang"></span>\n                            <span>'+a.sailnumber+"</span>\n                        </div>    \n                        <p>找相似</p>\n                    </a>\n                   "}),t.html(o),i(function(){i("img.lazy").lazyload({effect:"fadeIn"})}),s=[],e=[],c=p=null,i(".body_wrap .goods_content .goods").each(function(n,a){e[n]=i(this),s[n]=i(this)})})}}),i(".body_wrap .goods_about li").eq(0).on("click",function(){i.each(s,function(n,a){i(".body_wrap .goods_content").append(a)})}),i(".body_wrap .goods_about li").eq(1).on("click",function(){for(var n=0;n<e.length-1;n++)for(var a,o=0;o<e.length-n-1;o++){p=parseFloat(e[o].find(".price span").eq(1).html()),(c=parseFloat(e[o+1].find(".price span").eq(1).html()))<p&&(a=e[o],e[o]=e[o+1],e[o+1]=a)}i.each(e,function(n,a){i(".body_wrap .goods_content").append(a)})}),i(".body_wrap .goods_about li").eq(2).on("click",function(){for(var n=0;n<e.length-1;n++)for(var a,o=0;o<e.length-n-1;o++){p=parseFloat(e[o].find(".price span").eq(5).html()),c=parseFloat(e[o+1].find(".price span").eq(5).html()),p<c&&(a=e[o],e[o]=e[o+1],e[o+1]=a)}i.each(e,function(n,a){console.log(a),i(".body_wrap .goods_content").append(a)})})}(jQuery);