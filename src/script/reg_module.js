define([], function() {
    return {
        init: function() {
            const $username = $('#username');
            const $password = $('#password');
            let $aspan = $('.loginreg_info span');
            let telflag = true;
            let pwdflag = false;

            $username.on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.76/dashboard/nubiaByxx/php/reg.php',
                    data: {
                        username: $username.val()
                    }
                }).done(function(data) {
                    if ($username.val()) {
                        if (!data) {
                            $aspan.eq(0).show().css('color', 'green').html('√');
                            telflag = true;
                        } else {
                            $aspan.eq(0).show().css('color', 'red').html('该手机号已注册');
                            telflag = false;
                        }
                        let $reg = /^1(3|5|6|7|8|9)\d{9}$/;
                        if ($reg.test($username.val())) {
                            $aspan.eq(0).hide();
                            telflag = true;
                        } else {
                            $aspan.eq(0).show().css('visibility', 'visible').html('请输入11位有效中国手机号码！');
                            telflag = false;
                        }
                    } else {
                        $aspan.eq(0).show().css('visibility', 'visible').html('请输入手机号码！');
                        telflag = false;
                    }

                });


            }); // 密码验证

            // $aspan.eq(1).hide();
            // $password.on('input', function() {
            //     // console.log($(this).val().length);

            //     if ($(this).val().length >= 8 && $(this).val().length <= 16) {
            //         let $regNum = /\d+/g;
            //         let $reglower = /[a-z]+/g;
            //         let $regupper = /[A-Z]+/g;
            //         let $count = 0;
            //         // 特殊字符且包括下划线（不要漏了下划线）
            //         let $regSpec = /[\W_]+/;
            //         console.log($(this).val());
            //         // 判断语种数量
            //         if ($regNum.test($(this).val())) {
            //             $count++;
            //         }
            //         if ($reglower.test($(this).val())) {
            //             $count++;
            //         }
            //         if ($regupper.test($(this).val())) {
            //             $count++;
            //         }
            //         if ($regSpec.test($(this).val())) {
            //             $count++;
            //         }
            //         console.log($count);
            //         if ($count !== 3) {
            //             $aspan.eq(1).show();
            //             $aspan.eq(1).html('密码为8-16个字符（数字、大小写字母、符号至少包含三种）');
            //             $password.css({ 'border': '1px solid red', 'outline': 'none' });
            //             pwdflag = false;
            //         }
            //     } else {
            //         $aspan.eq(1).show();
            //         $aspan.eq(1).html('密码为8-16位字符！');
            //         $password.css({ 'border': '1px solid red', 'outline': 'none' });
            //         pwdflag = false;
            //     }
            // });
            // $password.blur(function() {
            //     if ($(this).val() !== '') {
            //         $aspan.eq(1).hide();
            //         $password.css({ 'border': '1px solid #333', 'outline': 'none' });
            //         pwdflag = true;
            //     } else {
            //         $aspan.eq(1).show();
            //         // $aspan.eq(1).html('密码不可为空！');
            //         $password.css({ 'border': '1px solid red', 'outline': 'none' });
            //         pwdflag = false;
            //     }
            // })

        }
    }
});