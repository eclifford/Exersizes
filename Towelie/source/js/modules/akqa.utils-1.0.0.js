define([
	    "jquery", 
	    "../libs/tinypubsub/tinypubsub"], function() {

	$.subscribe('log', function(e, message) {
		console.log('log event fired');
		console.log(message);
	});

	return {
		log: function(value) {
			console.log(value);
		}
	};
});