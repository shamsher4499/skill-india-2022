$(document).ready(function () {
    //debugger;
    var param1 = document.getElementsByClassName('lastupdatedatejs');//.getAttribute("param");
    var param2 = param1[0].getAttribute('param');
    
    $.ajax({
        type: 'GET',
        url: '/Portal/GetLastUpdatedDate',
        datatype: 'json',
        contentType: 'application/json; charset=utf-8',
        data: { languageId: param2 },
        success: function (result) {
            $('#lastUpdatedDate').html(result);
        },
        error: function (xhr, status, error) {

        }

    });
});
