// Used to interface with the Core
var Sandbox = (function() {
	return {
		create: function(core, module_selector) {
			// Parent of the module
			var CONTAINER = core.dom.query('#' + module_selector);
			return {
				find: function(selector) {
					return CONTAINER.query(selector);
				},
				addEvent: function(element, type, fn) {
					core.dom.bind(element, type, fn);
				},
				removeEvent: function(element, type, fn) {
					core.domb.unbind(element, type, fn);
				},
				notify: function(evt) {
					if(core.is_object(evt) && evt.type) {
						core.triggerEvent(evt);
					}
				},
				listen: function(evts) {
					if(core.is_obj(evts) {
						core.registerEvents(evts, module_selector);
					}
				},
				ignore: function(evts) {
					if(core.is_arr(evts) {
						core.removeEvents(evts, module_selector);
					})
				},
				create_element: function(el, config) {
					var i, child, text;
					el = core.dom.create(el);
					if(config) {
						if(config.children && core.is_arr(config.children)) {
							i = 0;
							while(child = config.children[i]) {
								el.appendChild(child);
								i++;
							}
							delete config.children;
							if(config.text) {
								 text = document.createTextNode(config.text);
								 delete config.text;
								 el.appendChild(text);
							}
							core.dom.apply_attrs(el, config);
							return el;
						}
					}
				}
			};
		}
	}
})();