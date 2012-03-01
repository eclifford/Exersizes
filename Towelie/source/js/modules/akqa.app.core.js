define(["jquery", 
	    "underscore", 
	    "backbone", 
	    "../libs/tinypubsub/tinypubsub",
	    "modules/akqa.utils-1.0.0"], 
   function ($, _, backbone, obs, util) {
   	console.log('akqa.app.core loaded');

   	$.subscribe('testing', function() {
   		console.log('hi');
   	});
   	var message = 'wtf';
   	$.publish('testing');
   	$.publish('log', message);

   	util.log('hey');
});