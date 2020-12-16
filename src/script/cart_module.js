define(['jcookie'], function() {
    return {
        init: function() {
            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let $arrsid = $.cookie('cookiesid').split(',');
                    let $arrnum = $.cookie('cookienum').split(',');
                    $.each($arrsid, function(index, value) {
                        rendergoods($arrsid[index], $arrnum[index]);
                    });
                }
            }
            cookietoarray();

            function rendergoods(sid, num) {
                $.ajax({
                    url: 'http://10.31.161.76/dashboard/nubiaByxx/php/indexdata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid === value.sid) {
                            let $clonebox = $('.goodslist:hidden').clone(true, true); //克隆
                            $clonebox.find('.goodspic img').attr('src', value.url);
                            $clonebox.find('.goodstitle').html(value.title);
                            $clonebox.find('.goodsprice').html('￥' + value.price);
                            $clonebox.find('.goodsnum i').html(num);
                            $clonebox.find('.goodstotal em').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block'); //显示
                            $('.goodsinfo').append($clonebox); //追加
                            calprice();
                        }
                    });
                });
            }

            function calprice() {
                let $sum = 0;
                let $count = 0;
                $('.goodslist:visible').each(function(index, ele) {
                    $sum += parseInt($(ele).find('.goodsnum i').html());
                    $count += parseFloat($(ele).find('.goodstotal em').html());
                    console.log($count);
                });
                $('.alchoice').find('span').html($sum);
                $('.goodstotals i').html($count.toFixed(2));
            }

        }
    }
});