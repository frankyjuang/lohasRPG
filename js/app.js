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
