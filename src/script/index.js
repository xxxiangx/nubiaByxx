! function($) {
    const $carousel = $('.carousel');
    const $ulist = $('.inner_cs'); //运动的盒子
    const $piclist = $('.inner_cs li'); //6个图片
    const $btnlist = $('.index_cs li'); //5个圈圈
    const $leftarrow = $('.cs_left');
    const $rightarrow = $('.cs_right');
    let timer = null;
    let $num = 0; //存储索引值

    //1.先改变布局，计算$ulist的宽度
    const $liwidth = $piclist.eq(0).width(); //1个li的宽度(图片的宽度)
    $ulist.width($liwidth * $piclist.size());
    //2.5个圈圈添加点击事件。让$ulist进行运动。
    $btnlist.on('click', function() {
        $num = $(this).index() - 1; //获取当前的圈圈的索引，赋值给$num  -1因为下面封装的函数里面有个$num++;
        tabSwitch();
    });

    //3.显示左右箭头。
    $carousel.hover(function() {
        clearInterval(timer); //鼠标移入停止自动轮播
        $leftarrow.show();
        $rightarrow.show();
    }, function() {
        $leftarrow.hide();
        $rightarrow.hide();
        timer = setInterval(function() { //鼠标移出继续自动轮播。
            $rightarrow.click();
        }, 3000);
    });

    //4.左右箭头添加点击事件。
    $rightarrow.on('click', function() {
        tabSwitch();
    });

    $leftarrow.on('click', function() {
        $num -= 2; //-1:$ulist迁移一张图片，但是封装函数里面又有++,达到-1的效果，需要-2.
        tabSwitch();
    });


    //5.代码冗余，进行函数封装
    function tabSwitch() {
        $num++; //将索引封装进函数，方便后续的左右箭头对索引的判断。

        //如果索引等于5.将$ulist位置进行重置。
        //判断右箭头
        //这里作为的判断的时候是最后一张，重置位置和设置索引安装第一张图片进行设置的
        if ($num === $btnlist.size() + 1) {
            $ulist.css('left', 0);
            $num = 1;
        }
        //判断左箭头
        if ($num === -1) {
            $ulist.css('left', -$liwidth * $btnlist.size());
            $num = $btnlist.size() - 1;
        }

        //判断小圈圈
        if ($num === $btnlist.size()) {
            $btnlist.eq(0).addClass('active').siblings('li').removeClass('active');
        } else {
            $btnlist.eq($num).addClass('active').siblings('li').removeClass('active');
        }


        $ulist.stop(true).animate({
            left: -$liwidth * $num
        });
    }

    //6.自动轮播
    timer = setInterval(function() {
        $rightarrow.click();
    }, 3000);



    //二级菜单里的菜单tab切换
    const $headtab_li = $('.con_li');
    const $headtab = $('.head_tab');
    const $lists = $('.items');

    $headtab_li.hover(function() {
        if ($(this).children('div').hasClass('head_tab')) {
            $headtab.show().siblings('.head_tab').hide();
            $headtab_li.eq($(this).index()).css('color', '#999');
        } else {
            $headtab_li.eq($(this).index()).css('color', '#999');
        }
    }, function() {
        $headtab.hide();
        $headtab_li.eq($(this).index()).css('color', '#333');
    })

    $.ajax({
        url: 'http://localhost/dashboard/nubiaByxx/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '';
        $.each(data, function(index, value) {
            $strhtml += `
            <li>
                <img src="${value.url}" alt="">
                <p class="title">${value.title}</p>
                <span>新品</span>
            </li>
            `;
        })
        $lists.html($strhtml);
    })

}(jQuery);