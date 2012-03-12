define([], function() {
	var debug = true;

	return {
		debug: function(on) {
			debug = on ? true : false;
		},

		log: function(severity, message) {
	    if(debug) {
	      console[ (severity === 1) ? 'log' : (severity === 2) ? 'warn' : 'error'](message);
	    } else {
	      // send to the server
	    }
		}
	};
});