require.config({
    paths: {
        jquery: 'libs/jquery/jquery-1.7.1',
        underscore: 'libs/underscore/underscore-1.3.1',
        backbone: 'libs/backbone/backbone-0.9.1',
        text: 'libs/requirejs/text'
    }
});

require(["./modules/akqa.app.core"], function (mediator) {
   // mediator.publish('appInit', "#todoapp");
});