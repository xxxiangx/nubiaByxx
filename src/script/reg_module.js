define([], function() {
    return {
        init: function() {
            let $loginreg = $('.loginreg');
            let $username = $('#username');
            let $password = $('#password');
            let $aspan = $('.loginreg_info span');
            let $accept = $('.accept input');

            $telflag = true;
            $pwdflag = true;
            $checkflag = true;

            $username.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        $username.css('border-color', 'green');
                        $telflag = true;
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.76/dashboard/nubiaByxx/php/reg.php',
                            data: {
                                username: $username.val()
                            }
                        }).done(function(data) {
                            if (!data) {
                                $username.css('border-color', 'green');
                                $aspan.eq(0).css('visibility', 'hidden');
                            } else {
                                $username.css('border-color', 'red');
                                $aspan.eq(0).html('手机号码已注册').css('visibility', 'visible');
                            }
                        });
                    } else {
                        $aspan.eq(0).html('手机号码格式有误').css('visibility', 'visible');
                        $telflag = false;
                    }
                } else {
                    $aspan.eq(0).html('手机号码不能为空').css('visibility', 'visible');
                    $telflag = false;
                }
            });

            $password.on('input', function() {
                let $value = $(this).val();
                if ($value.length >= 8 && $value.length <= 16) {
                    let $regnum = /\d+/g;
                    let $reglower = /[a-z]+/g;
                    let $regupper = /[A-Z]+/g;
                    let $regspec = /[\W_]+/;
                    let $count = 0;
                    // 判断语种数量
                    if ($regnum.test($value)) {
                        $count++;
                    }
                    if ($reglower.test($value)) {
                        $count++;
                    }
                    if ($regupper.test($value)) {
                        $count++;
                    }
                    if ($regspec.test($value)) {
                        $count++;
                    }
                    if ($count >= 3) {
                        $aspan.eq(1).css({ 'border-color': 'green', 'visibility': 'hidden' });
                        $pwdflag = false;
                    } else {
                        $aspan.eq(1).html('密码为8-16个字符（数字、大小写字母、符号至少包含三种）').css('visibility', 'visible');
                    }
                } else {
                    $aspan.eq(1).html('密码格式错误').css('visibility', 'visible');
                    $pwdflag = false;
                }
            });

            $password.on('blur', function() {
                if ($(this).val() !== '') {
                    $password.css('border-color', 'green');
                    $pwdflag = true;
                } else {
                    $aspan.eq(1).html('密码不能为空').css('visibility', 'visible');
                    $pwdflag = false;
                }
            })

            $accept.on('input', function() {
                if ($(this).is(':checked')) {
                    $('.accept').css('color', '#666');
                    $checkflag = true;
                } else {
                    $('.accept').css('color', 'red');
                    $checkflag = false;
                }
            });

            $loginreg.on('submit', function() {
                if ($username.val() === '') {
                    $aspan.eq(0).html('手机号码不能为空').css('visibility', 'visible');
                    $telflag = false;
                }
                if ($password.val() === '') {
                    $aspan.eq(1).html('密码不能为空').css('visibility', 'visible');
                    $pwdflag = false;
                }
                if ($accept.is(':checked') == false) {
                    $('.accept').css('color', 'red');
                    $checkflag = false;
                }
                if (!$telflag || !$pwdflag || !$checkflag) {
                    return false;
                }
            });

        }
    }
});