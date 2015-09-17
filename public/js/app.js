
$( document ).ready(function() {
    var $table = $('.table').hide();
    var $noResult = $('.noResult').hide();
    var $error = $('.error').hide();


    $("form#data").submit(function(e){
         e.preventDefault();

        $table = $('.table').hide();
        $noResult = $('.noResult').hide();
        $error = $('.error').hide();
        $('td').remove();

        //grab all form data  
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (retData) {
                if (retData.length > 0) {
                    $table.show();
                    _.each(retData, function(user){
                        var html = '<td>' + user.user_id + '</td>' +
                                   '<td>' + user.name + '</td>' +
                                   '<td>' + user.latitude + '</td>' +
                                   '<td>' + user.longitude + '</td>';
                        $row = $('<tr>').html(html);
                        $table.append($row);
                    });
                } else {
                    $noResult.show();
                }
            },
            error: function(err) {
                $error.show();
            }
        });

        return false;
    });
});