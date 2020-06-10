! function($) {
    const $form = $('.registry_wrap .registry_box form');
    const $username = $('.username');
    const $password = $('.password');
    const $repass = $('.repass');
    const $email = $('.email');
    const $span = $('.registry_box form p span');

    //每一个表单一个标记。
    let userflag = true; //标记
    let passflag = true;
    let repassflag = true;
    let emailflag = true;

    //1.用户名
    $username.on('focus', function() {
        $span.eq(0).html('设置后不可更改，中英文均可，最长14个英文或7个汉字').css({
            color: 'black'
        });
    });

    $username.on('blur', function() {
        if ($(this).val() !== '') { //有值
            let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length; //将中文转换成两个英文计算长度
            if (len < 14) {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.162.38/Mogujie/php/registry.php',
                    data: {
                        username: $username.val()
                    }
                }).done(function(result) {
                    if (!result) { //不存在
                        $span.eq(0).html('该用户名可用').css('color', 'green');
                        $userflag = true;
                    } else {
                        $span.eq(0).html('该用户名已经存在').css('color', 'red');
                        $userflag = false;
                    }
                })
            } else {
                $span.eq(0).html('该用户名长度有问题').css({
                    color: 'red'
                });
                userflag = false;
            }
        } else {
            $span.eq(0).html('该用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }
    });

    //2.密码
    $password.on('focus', function() {
        $span.eq(1).html('长度为8~14个字符,至少包含2种字符').css({
            color: 'black'
        });
    });

    $password.on('input', function() {
        let $pass = $(this).val();
        if ($pass.length >= 8 && $pass.length <= 14) {
            let regnum = /\d+/;
            let regupper = /[A-Z]+/;
            let reglower = /[a-z]+/;
            let regother = /[\W\_]+/; //其他字符

            //test():匹配存在感
            let $count = 0; //计数

            if (regnum.test($pass)) {
                $count++;
            }

            if (regupper.test($pass)) {
                $count++;
            }

            if (reglower.test($pass)) {
                $count++;
            }

            if (regother.test($pass)) {
                $count++;
            }

            switch ($count) {
                case 1:
                    $span.eq(1).html('密码强度弱').css({
                        color: 'red'
                    });
                    passflag = false;
                    break;

                case 2:
                case 3:
                    $span.eq(1).html('密码强度中').css({
                        color: 'yellow'
                    });
                    passflag = true;
                    break;
                case 4:
                    $span.eq(1).html('密码强度强').css({
                        color: 'green'
                    });
                    passflag = true;
                    break;
            }

        } else {
            $span.eq(1).html('密码长度错误').css({
                color: 'red'
            });
            passflag = false;
        }
    });

    $password.on('blur', function() {
        if ($(this).val() !== '') {
            if (passflag) {
                $span.eq(1).html('密码有效').css({
                    color: 'green'
                });
                passflag = true;
            }
        } else {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            passflag = false;
        }
    });

    //3.验证密码
    $repass.on('blur', function() {
        if ($(this).val() === '') {
            $span.eq(2).html('密码验证不能为空').css('color', 'red');
            repassflag = false;
        } else {
            if ($(this).val() !== $password.val()) {
                $span.eq(2).html('密码验证不一致').css('color', 'red');
                repassflag = false;
            } else {
                $span.eq(2).html('密码一致').css('color', 'green');
                repassflag = true;
            }
        }
    })

    //4.邮箱
    $email.on('blur', function() {
        let regemail = /^(\w+[\+\-\.]*\w+)\@(\w+[\-\.]*\w+)\.(\w+[\-\.]*\w+)$/;
        let $emailval = $(this).val();
        if ($emailval === '') {
            $span.eq(3).html('邮箱不能为空').css('color', 'red');
            emailflag = false;
        } else {
            if (regemail.test($emailval)) {
                $span.eq(3).html('该邮箱有效').css('color', 'green');
                emailflag = true;
            } else {
                $span.eq(3).html('该邮箱有误').css('color', 'red');
                emailflag = false;
            }
        }

    })

    $form.on('submit', function() {
        if ($username.val() === '') {
            $span.eq(0).html('该用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }
        if ($password.val() === '') {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            passflag = false;
        }
        if ($repass.val() === '') {
            $span.eq(2).html('密码验证不能为空').css({
                color: 'red'
            });
            repassflag = false;
        }
        if ($email.val() === '') {
            $span.eq(3).html('邮箱不能为空').css({
                color: 'red'
            });
            emailflag = false;
        }
        //阻止跳转：DOM 0级事件 return false   DOM 2级  event.perventDefault() / event.returnValue = false
        if (!userflag || !passflag || !repassflag || !emailflag) {
            return false;
        }
    });
}(jQuery)