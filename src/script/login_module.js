define([], function() {
    return {
        init: function() {
            const $username = $('.username');
            const $password = $('.password');
            $('.loginreg_btn').on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.76/dashboard/nubiaByxx/php/login.php',
                    data: {
                        user: $username.val(),
                        pass: $password.val()
                    }
                }).done(function(data) {
                    console.log(data);
                    location.href = 'index_1.html';
                })
            })
        }
    }
});