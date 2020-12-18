define([], function() {
    return {
        init: function() {
            const $username = $('#username');
            const $password = $('#password');

            $('.loginreg_btn').on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.76/dashboard/nubiaByxx/php/login.php',
                    data: {
                        username: $username.val(),
                        password: $password.val()
                    }
                }).done(function(data) {
                    if (!data) {
                        alert('用户名或者密码有误!');
                        $password.val('');
                    } else {
                        location.href = 'index.html';
                        localStorage.setItem('loginname', $username.val());
                    }
                })
            })
        }
    }
});