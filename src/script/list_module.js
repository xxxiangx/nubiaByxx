define(['jlazyload', 'pagination'], () => {
    return {
        init: function() {
            const $ulists = $('.ulists');
            let $array_default = []; //排序前的li放入此数组。
            let $array = []; //排序后的数组
            let $prev = []; //li里面的商品的前一个价格
            let $next = []; //li里面的商品的后一个价格

            $.ajax({
                url: 'http://10.31.161.76/dashboard/nubiaByxx/php/listdata.php',
                dataType: 'json'
            }).done(function(datalist) {

                data = datalist.pagedata;

                let $strhtml = '';
                $.each(data, function(index, value) { 
                    if (!value.oprice) {
                        $old_price  =  ``;
                        $new_price  =  `<i>￥${value.price}</i>`;          
                    } else {
                        $old_price  =  `<p><del>￥${value.oprice}</del></p >`; 
                        $new_price  =  `<i>￥${value.price}</i>`;          
                    }
                    $strhtml += `
                    <li class="list">
                        <a href="detail.html?sid=${value.sid}">
                            <span class="li_new">新品</span>
                            <img class="lazy" data-original="${value.url}">
                            <p class="title">${value.title}</p>
                            ${$old_price}
                            ${$new_price}
                        </a>
                    </li>
                    `;
                })
                $ulists.html($strhtml);

                //懒加载
                $("img.lazy").lazyload({ effect: "fadeIn" });

                //将li元素排序
                $('.list').each(function(index, element) {
                    $array_default[index] = $(this);
                    $array[index] = $(this);
                })

                //分页设置
                $('.page').pagination({
                    pageCount: datalist.pageno, //总的页数
                    jump: true, //是否开启跳转到指定的页数，布尔值。
                    prevContent: '上一页', //将图标改成上一页下一页。
                    nextContent: '下一页',
                    callback: function(api) {
                        console.log(api.getCurrent()); //获取当前的点击的页码。
                        $.ajax({
                            url: 'http://10.31.161.76/dashboard/nubiaByxx/php/listdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(datalist) {
                            data = datalist.pagedata; //获取接口里面数据
                            let $strhtml = '';
                            $.each(data, function(index, value) { 
                                if (!value.oprice) {
                                    $old_price  =  ``;
                                    $new_price  =  `<i>￥${value.price}</i>`;          
                                } else {
                                    $old_price  =  `<p><del>￥${value.oprice}</del></p>`; 
                                    $new_price  =  `<i>￥${value.price}</i>`;          
                                }
                                $strhtml += `
                                <li class="list">
                                    <a href="detail.html">
                                        <span class="li_new">新品</span>
                                        <img class="lazy" data-original="${value.url}">
                                        <p class="title">${value.title}</p>
                                        ${$old_price}
                                        ${$new_price}
                                    </a>
                                </li>
                                `;
                            })
                            $ulists.html($strhtml);

                            //懒加载
                            $("img.lazy").lazyload({ effect: "fadeIn" });

                            //将li元素添加到排序前的数组中。
                            $('.list').each(function(index, element) { //element:原生的元素对象
                                $array_default[index] = $(this); //排序前
                                $array[index] = $(this); //排序后
                            });
                            console.log($array_default);
                        });
                    }
                });

                //点击按钮进行排序
                $('button').eq(0).on('click', function() {
                    //遍历渲染。
                    $.each($array_default, function(index, value) { //value就是li元素
                        $ulists.append(value);
                    });
                });
                $('button').eq(1).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('i').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('i').html().substring(1)); //下一个价格
                            if ($prev > $next) {
                                //通过价格的比较,交换的是里面的这个li元素
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) { //value就是li元素
                        $ulists.append(value);
                    });
                });

                $('button').eq(2).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('i').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('i').html().substring(1)); //下一个价格
                            if ($prev < $next) {
                                //通过价格的比较,交换的是里面的这个li元素
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) { //value就是li元素
                        $ulists.append(value);
                    });
                });
            })
        }
    }
});