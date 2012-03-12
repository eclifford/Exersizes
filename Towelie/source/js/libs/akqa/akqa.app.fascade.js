define([ "core" , "permissions" ], function (core, permissions) {
	var facade = facade || {};

	facade.subscribe = function(subscriber, channel, callback){

	    // Note: Handling permissions/security is optional here
	    // The permissions check can be removed 
	    // to just use the mediator directly.

	    if(permissions.validate(subscriber, channel)){
	        core.subscribe( channel, callback );
	    }
	}

	facade.publish = function(channel){
	    core.publish( channel );
	}

	return facade;

});