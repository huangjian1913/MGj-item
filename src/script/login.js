! function() {
    const btns = document.querySelectorAll('.login_wrap .tabsbox .tabs');
    const items = document.querySelectorAll('.login_wrap .logintab .items');
    const social = document.querySelector('.login_wrap .social');
    btns[0].onclick = function() {
        items[0].style.display = "flex";
        items[1].style.display = "none";
        social.style.top = 410 + 'px';
        for (let i = 0; i < btns.length; i++) {
            btns[i].className = "tabs";
        }
        this.className += " active";
    }
    btns[1].onclick = function() {
        items[0].style.display = "none";
        items[1].style.display = "block";
        social.style.top = 370 + 'px';
        for (let i = 0; i < btns.length; i++) {
            btns[i].className = "tabs";
        }
        this.className += " active";
    }
}()

! function($) {
    const $btn = $('form .submit');
    const $username = $('form .username');
    const $password = $('form .password');
    $btn.on('click', function(ev) {
        ev.preventDefault(); //阻止form表单里的提交按钮的默认行为
        $.ajax({
            type: 'post',
            url: 'http://10.31.162.38/Mogujie/php/login.php',
            data: {
                user: $username.val(),
                pass: hex_sha1($password.val())
            }
        }).done(function(result) {
            if (result) {
                location.href = "index.html";
                localStorage.setItem('username', $username.val());
            } else {
                $password.val('');
                alert('用户名或者密码错误');
            }
        });
    });
}(jQuery);