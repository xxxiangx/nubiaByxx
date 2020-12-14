! function() {
    const $ulists = $('.ulists');

    $.ajax({
        url: 'http://localhost/dashboard/nubiaByxx/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '';
        $.each(data, function(index, value) { 
            if (!value.oprice) {
                $old_price  =  `<p style="visibility:hidden"><del></del></p>`;
                $new_price  =  `<p>￥${value.price}</p >`;          
            } else {
                $old_price  =  `<p><del>￥${value.oprice}</del></p >`; 
                $new_price  =  `<p>￥${value.price}</p >`;          
            }
            $strhtml += `
            <li class="list">
                <span>新品</span>
                <img src="${value.url}" alt="">
                <p class="title">${value.title}</p>
                ${$old_price}
                ${$new_price}
            </li>
            `;
        })
        $ulists.html($strhtml);
    })
}();