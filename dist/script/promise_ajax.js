"use strict";function $ajax(n){return new Promise(function(t,e){var a=new XMLHttpRequest;if(n.type=n.type||"get",!n.url)throw new Error("请输入接口地址");n.data&&("Object"===Object.prototype.toString.call(n.data).slice(8,-1)?n.data=function(t){var e=[];for(var a in t)e.push(a+"="+t[a]);return e.join("&")}(n.data):n.data),n.data&&"get"===n.type&&(n.url+="?"+n.data),"false"===n.async||!1===n.async?n.async=!1:n.async=!0,a.open(n.type,n.url,n.async),n.data&&"post"===n.type?(a.setRequestHeader("content-type","application/x-www-form-urlencoded"),a.send(n.data)):a.send(),n.async?a.onreadystatechange=function(){4===a.readyState&&(200===a.status?t(a.responseText):e("数据接口有错误"))}:200===a.status?t(a.responseText):e("数据接口有错误")})}