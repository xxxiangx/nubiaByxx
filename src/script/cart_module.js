define(['jcookie'], function() {
    return {
        init: function() {
            function getcookie() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let $arrsid = $.cookie('cookiesid').split(',');
                    let $arrnum = $.cookie('cookienum').split(',');
                    $.each($arrsid, function(index, value) {
                        rendergoods($arrsid[index], $arrnum[index]);
                    });
                }
            }
            getcookie();

            function rendergoods(sid, num) {
                $.ajax({
                    url: 'http://10.31.161.76/dashboard/nubiaByxx/php/indexdata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid === value.sid) {
                            let $clonebox = $('.goodslist:hidden').clone(true, true); //克隆
                            $clonebox.find('.goodspic img').attr('src', value.url);
                            $clonebox.find('.goodspic img').attr('sid', value.sid);
                            $clonebox.find('.goodstitle').html(value.title);
                            $clonebox.find('.goodsprice i').html(value.price);
                            $clonebox.find('.goodsnum i').html(num);
                            $clonebox.find('.goodstotal em').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block'); //显示
                            $('.goodsinfo').append($clonebox); //追加
                            calprice();
                        }
                    });
                });
            }

            //总价和总件数
            function calprice() {
                let $sum = 0;
                let $count = 0;
                $('.goodslist:visible').each(function(index, ele) {
                    $sum += parseInt($(ele).find('.goodsnum i').html());
                    $count += parseFloat($(ele).find('.goodstotal em').html());
                });
                $('.alchoice').find('span').html($sum);
                $('.goodstotals i').html($count.toFixed(2));
            };

            //计算单个商品的总价
            function singleprice(obj) {
                let $singleprice = parseFloat(obj.parents('.goodslist').find('.goodsprice i').html());
                console.log($singleprice);
                let $num = parseFloat(obj.parents('.goodslist').find('.goodsnum i').html());
                return ($singleprice * $num).toFixed(2); //保留2位小数。
            }

            let $aspan = $('.goodsnum span');
            $aspan.eq(1).on('click', function() {
                let $num = $(this).parents('.goodslist').find('.goodsnum i').html(); //取值
                $num++;
                if ($num > 99) {
                    $num = 99;
                }
                $(this).parents('.goodslist').find('.goodsnum i').html($num);
                $(this).parents('.goodslist').find('.goodstotal em').html(singleprice($(this))); //计算单个商品的总价，进行赋值
                calprice(); //计算总和
                addcookie($(this)); //重新存储cookie中的值
            });

            $aspan.eq(0).on('click', function() {
                let $num = $(this).parents('.goodslist').find('.goodsnum i').html(); //取值
                $num--;
                if ($num <= 0) {
                    cookietoarray(); //cookie转换成数组
                    if (window.confirm('你确定要删除吗?')) {
                        $(this).parents('.goodslist').remove();
                        calprice(); //计算总价
                        delcookie($(this).parents('.goodslist').find('img').attr('sid'), $arrsid);
                        //传入当前的sid 和 cookiesid的值
                        if ($arrsid.length === 0) {
                            $.cookie('cookiesid', $arrsid, { expires: -1, path: '/' });
                            $.cookie('cookienum', $arrnum, { expires: -1, path: '/' });
                        }
                    }
                }
                $(this).parents('.goodslist').find('.goodsnum i').html($num);
                $(this).parents('.goodslist').find('.goodstotal em').html(singleprice($(this))); //计算单个商品的总价，进行赋值
                calprice(); //计算总和
                addcookie($(this)); //重新存储cookie中的值
            });

            //重置数组
            let $arrsid = [];
            let $arrnum = [];
            //cookie转换成数组
            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    $arrsid = $.cookie('cookiesid').split(','); //[4,5,6] 
                    $arrnum = $.cookie('cookienum').split(','); //[10,50,60] 
                }
            }

            //将改变后的值存放cookie中 - 获取商品的sid,通过sid找到商品的数量。
            function addcookie(obj) {
                cookietoarray();
                let $sid = obj.parents('.goodslist').find('img').attr('sid'); //获取sid
                $arrnum[$.inArray($sid, $arrsid)] = obj.parents('.goodslist').find('.goodsnum i').html(); //赋值
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });
            }

            $('.goodsdel').on('click', function() {
                cookietoarray(); //cookie转换成数组
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.goodslist').remove();
                    calprice(); //计算总价
                    delcookie($(this).parents('.goodslist').find('img').attr('sid'), $arrsid);
                    //传入当前的sid 和 cookiesid的值
                    if ($arrsid.length === 0) {
                        $.cookie('cookiesid', $arrsid, { expires: -1, path: '/' });
                        $.cookie('cookienum', $arrnum, { expires: -1, path: '/' });
                    }
                }
            });

            //删除商品对应的sid和num
            function delcookie(sid, $arrsid) { //sid:删除商品的sid   arrsid:数组，cookie里面的值
                let $sidindex = -1; //假设接收索引的值
                $.each($arrsid, function(index, value) {
                    if (sid === value) {
                        $sidindex = index; //接收删除项的索引值
                    }
                });
                //删除
                $arrsid.splice($sidindex, 1);
                $arrnum.splice($sidindex, 1);
                //重新设置cookie
                $.cookie('cookiesid', $arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });
            }

        }
    }
});