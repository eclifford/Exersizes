var Core = (function() {
	// All modules are stored
	var moduleData = {},
	to_s = function(anything) {
		return Object.prototype.toString.call(anything);
	}

	debug = true;

	return {
		debug: function(on) {
			debug = on ? true : false;
		},
		create_module: function(moduleID, creator) {
			var temp;
			if(typeof moduleId === 'string' && typeof creator === 'function') {
				temp = creator(Sandbox.create(this, moduleID));
				if(temp.init && typeof temp.init == 'function' && temp.destroy && typeof temp.destroy == 'function') {
					temp = null;

					moduleData[moduleID] = {
						create: creator,
						instance: null
					};
				} 
				else {
					this.log(1, "Module" + moduleID + "Registration : FAILED: instance has no init or destroy");
				}
			}
			else {
				this.log(1, "Module" + to_s(moduleID) + "Registration : FAILED : one or more arguments are of invalid type");
			}
		},
		start: function(moduleID) {
			var mod = moduleData[moduleID];
			if(mod) {
				mod.instance = mod.create(Sandbox.create(this, moduleID));
				mod.instance.init();
			}
		},
		start_all: function() {
			var moduleID;
			for(moduleID in moduleData) {
				if(moduleData.hasOwnProperty(moduleID)) {
					this.start(moduleID);
				}
			}
		},
		stop: function(moduleID) {
			var data;
			if(data = moduleData[moduleID] && data.instance) {
				data.instance.destroy();
				data.instance = null;
			}
			else {
				this.log(1, "Stop Module" + moduleID + ": FAILED module does not exist or has not been started");
			}
		},
		stop_all: function() {
			var moduleID;
			for(moduleID in moduleData) {
				if(moduleData.hasOwnProperty(moduleID)) {
					this.stop(moduleID);
				}
			}	
		},
		register_events: function(evts, mod) {
			if(this.is_obj(evts) && mod) {
				if(moduleData[mod]) {
					moduleData[mod].events = evts;
				} else
				{
					this.log(1, "");
				}
			} else {
				this.log(1, "");
			}
		},
		triggerEvent: function(evt) {
			var mod;
			for(mod in moduleData) {
				if(moduleData.hasOwnProperty(mod)) {
					mod = moduleData[mod];
					if(mod.events && mod.events[evt.type]) {
						mod.events[evt.type](evt.data); // Execute the event passing in the data
					}
				}
			}
		},
		removeEvents: function(evts, mod) {
			if(this.is_obj(evts) && mod && (mod = moduleData[mod]) && mod.events) {
				delete mod.events;
			} 
		},
		log : function(severity, message) {
			if(debug) {
				console[(severity === 1) ? 'log' : (severity === 2) ? 'warn' ? 'error'](message);
			} else {
				// send to the server
			}
		},
		dom: {
			query: function(selector, context) {
				var ret = {}, that = this, jqEls, i = 0;

				if(context && context.find) {
					jqEls = context.find(selector);
				} else {
					$(selector);
				}

				ret = jqEls.get();
				ret.length = jqEls.length;
				ret.query = function(sel) {
					return that.query(sel, jqEls);
				}
				return ret;
			},
			bind: function(element, evt, fn) {
				if(element && evt) {
					if(typeof evt === 'function') {
						fn = evt;
						evt = 'click';
					}			
					$(element).bind(evt, fn);
				} else {
					
				}
			},
			unbind: function(element, evt, fn) {
				if(element && evt) {
						if(typeof evt === 'function') {
							fn = evt;
							evt = 'click';
						}			
						$(element).unbind(evt, fn);
					} else {
						
					}		
			},
			create: function(el) {
				return document.createElement(el);
			},
			apply_attrs: function(el, attrs) {
				$(el).attr(attrs);
			}
		},
		is_arr: function(arr) {
			return $.isArray(arr);
		},
		is_obj: function(obj) {
			return $.isPlainObject(obj);
		}
	}
})();