define(['jcookie'], function() {
    return {
        init: function() {
            let $sid = location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }
            $.ajax({
                url: 'http://10.31.161.76/dashboard/nubiaByxx/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                $('.goodspic img').attr('src', data.url);
                $('.p_name').html(data.title);
                $('.p_price span').html(data.price);
                $('title').html(data.title);

                let $picurl = data.urls.split(','); //将数据转换成数组。
                let $strhtml = '';
                $.each($picurl, function(index, value) {
                    $strhtml += `
                    <li>
                        <img src="${value}">
                    </li>
                    `;
                })
                $('.pic_list').html($strhtml);

                const $lists = $('.pic_list li');
                $lists.on('click', function() {
                    $(this).addClass('selected').siblings('li').removeClass('selected');
                    $imgsrc = $(this).children().attr('src');
                    $('.goodspic>img').attr('src', $imgsrc);
                })


                //1.设置存储cookie的变量。
                let arrsid = []; //存储商品的sid
                let arrnum = []; //存储商品的数量
                //2.判断是第一次存储，多次存储。
                //获取cookie才能判断，每存储一个商品对应的cookie就会发生变化。
                //提前预判cookie设置时的key值(cookiesid/cookienum)
                function getcookietoarray() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        arrsid = $.cookie('cookiesid').split(',');
                        arrnum = $.cookie('cookienum').split(',');
                    } else {
                        arrsid = [];
                        arrnum = [];
                    }
                }
                //上面的函数获取cookie值，并且转换成数组，方便判断是否是第一次。
                //第一次存储添加sid进入arrsid，存储数量
                //第二次以上，直接修改数量。
                $('.p_btn').on('click', function() {
                    getcookietoarray(); //获取cookie，变成数组，判断是否存在。
                    if ($.inArray($sid, arrsid) === -1) { //不存在
                        arrsid.push($sid);
                        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                        arrnum.push($('.count').html());
                        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                    } else { //存着
                        //通过$sid获取商品的数量所在的位置。
                        let $index = $.inArray($sid, arrsid);
                        // arrnum[$index]//原来的数组
                        // $('.count').html()//新添加的数量
                        arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('.count').html()); //重新赋值
                        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                    }
                    // alert('按钮被点击了');
                });
                const $aspan = $('.p_num span');
                let $num = $('.count').html();
                $aspan.eq(0).on('click', function() {
                    if ($num <= 1) {
                        $num = 1;
                    } else {
                        $num--;
                    }
                    $('.count').html($num);
                })
                $aspan.eq(1).on('click', function() {
                    $num++;
                    $('.count').html($num);
                })
            });
        }
    }
})