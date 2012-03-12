require.config({
  baseUrl:'.',
  paths: {
    jquery: 'libs/jquery-1.6.4.min.js',
    jquerymobile: 'libs/jquery.mobile-1.0.1.js',
    backbone: 'libs/backbone-0.9.1.js',
    underscore: 'libs/underscore-min-1.3.1.js',
    text: 'libs/requirejs-text-min-1.0.6.js'
  }
});

require(['views/app'], function(AppView){
  var app_view = new AppView;
});
