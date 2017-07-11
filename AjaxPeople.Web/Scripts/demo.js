$(function () {

    //setTimeout(function() {
    //    console.log('hello!!');
    //}, 2000);

    //console.log('world');

//    setInterval(function () {
//        var now = new Date();
//        var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
//        $("#time").text(time);
    //    }, 1000);

    $(".btn").on('click', function() {
       $.post('/demo/updatecount');
    });

    setInterval(function() {
        $.get('/demo/getcount', function(result) {
            $("#count").text(result.count);
        });
    }, 100);

});