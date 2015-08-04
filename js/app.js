var app = {
    isCordova: typeof cordova !== 'undefined',
    messages: {
        title: "LohasRPG",
    },
    bindEvents: function() {
        if(this.isCordova){
            document.addEventListener('deviceready', app.onDeviceReady, false);
        }
    },
    onDeviceReady: function() {
        console.log('deviceready');
        FastClick.attach(document.body);
    },
};


$("#home-botton").click(function(){
        $(".home-points").append(user.point);
});

var controlCSS = function(){
    $('link[rel="stylesheet"]').attr('disabled', 'disabled');
    $('#css-ratchet').removeAttr('disabled');
    $('#css-home').removeAttr('disabled');
    $('#css-sidr').removeAttr('disabled');
    $('#css-loading').removeAttr('disabled');
}

var controlSidr = function(){
        console.log("control sidr");
        $('#home-button').sidr({
            name: 'home-sidr',
            side: 'right',
            source: 'home.html',
            onOpen: function(){
                var wid = $(window).width();
                $('.bar').css({
                    "position": "absolute",
                    "left": "auto",
                    "width": wid
                });
                $('body').css({
                    "position": "absolute",
                    "left": "auto",
                    "width": wid
                });
            }
        });
    };

var closeWelcome = function() {
    setTimeout(function(){
        $('#welcome').css('display', 'none');
    }, 2000);
    };
