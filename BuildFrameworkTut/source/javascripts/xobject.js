function xObject(obj) {
	// If we omit the new operator then we construct the object
	if(this === window) {
		return new xObject(obj);
	}

	if(typeof obj === "string") {
		this.el = document.getElementById(obj);
	} else if (typeof obj === "object" && obj.nodeType !== "undefined" && obj.nodeType === 1) {
		this.el = obj;
	} else {
		throw new Error("Argument is of wrong type");
	}

	this._css = this.el.style;
}

// Event instance Methods
xObject.prototype.addEvent = function(evt, fn) {
	xObject.addEvent(this.el, evt, fn);

	return this; // for chaining
}

xObject.prototype.removeEvent = function(evt, fn) {
	xObject.removeEvent(this.el, evt, fn);

	return this; // for chaining
}

// Could iterate over these and create dynamically
//var events = ["click", "mouseout", "mouseover"];

xObject.prototype.click = function(fn) {
	var that = this;
	xObject.addEvent(this.el, "click", function(e) {
		fn.call(that, e); // 
	});
}

xObject.prototype.mouseover = function(fn) {
	var that = this;
	xObject.addEvent(this.el, "mouseover", function(e) {
		fn.call(that, e); // 
	});
}

xObject.prototype.mouseout = function(fn) {
	var that = this;
	xObject.addEvent(this.el, "mouseout", function(e) {
		fn.call(that, e); // 
	});
}


// EVENT STATIC METHODS
// Feature Specific versions of our addEvent function
if(typeof addEventListener !== "undefined") {
	console.log('webkit');
	xObject.addEvent = function(obj, evt, fn) {
		obj.addEventListener(evt, fn, false);
	};
	xObject.removeEvent = function(obj, evt, fn) {
		obj.removeEventListener(evt, fn, false);
	};
} else if(typeof attachEvent !== "undefined") {
	xObject.addEvent = function(obj, evt, fn) {
		var fnHash = "e_" + evt + fn;

		// Let's emulate the Standard model for IE
		obj[fnHash] = function() {
			var type = event.type,
				  relatedTarget = null;
			if(type === "mouseover" || type === "mouseout") {
				relatedTarget = (type === "mouseover") ? event.fromElement : event.toElement;
			}

			// We set the this instance to the object using call
			fn.call(obj, {
				target: event.srcElement,
				type: type,
				relatedTarget: relatedTarget,
				_event: event,
				preventDefault: function() {
					this._event.returnValue = false;
				},
				stopPropagation: function() {
					this._event.cancelBubble = true;
				}
			});
		}
		obj.attachEvent("on" + evt, obj[fnHash]);
	};

	xObject.removeEvent = function(obj, evt, fn) {
		var fnHash = "e_" + evt + fn;
		if(typeof obj[fnHash] !== "undefined") {
			obj.detachEvent("on" + evt, obj[fnHash]);
			delete obj[fnHash];
		}
	};

} else {
	xObject.addEvent = function(obj, evt, fn) {
		obj["on" + evt] = fn;	
	};
	xObject.removeEvent = function(obj, evt, fn) {
		obj["on" + evt] = null;
	}
}

/* Style static methods */
xObject.css = function(el, css, value) {
	var cssType = typeof css,
		  valueType = typeof value,
		  elStyle = el.style;

	if(cssType !== "undefined" && valueType === "undefined") {

		if(cssType === "object") {
			// Enumerate over the properties
			for(var prop in css) {
				// Remember to use hasOwnProperty so we don't get the prototype variables
				if(css.hasOwnProperty(prop)) {
					elStyle[toCamelCase(prop)] = css[prop];
				}
			}
		} else if(cssType === 'string') {
			console.log('getting the style');
			return getStyle(el, css);
		} else {
			throw {
				message: "Invalid paramaters passed to css"
			}
		}
	} else if(cssType === 'string' && valueType === 'string') {
			elStyle[toCamelCase(css)] = value;
	} else {
		throw {
			message: "Invalid paramaters passed to css"
		}
	}
}

xObject.hasClass = function(el, value) {
	// Substring search
	// We wrap both the classes and search string in whitespace 
	// " foo3 foo2 " classes
	// " foo " search term
	return (" " + el.className + " " ).indexOf(" " + value + " ") > -1; 
};

xObject.addClass = function(el, value) {
	// add one or more classes
	var className = el.className;

	// Does element have any classes?
	if(!className) {
		el.className = value;
	} else {
		// Split the classNames by whitespace
		var classNames = value.split(/\s+/),
		    l = classNames.length;

		for(var i = 0; i < l; i++) {
			// If the element does not already have this classname
			if(!this.hasClass(el, classNames[i])) {
				className += " " + classNames[i];
			}
		}
		// In one atomic operation set the dom's className from our cache
		el.className = className.trim();
	}
};

xObject.removeClass = function(el, value) {
	if(value) {
		// Support for multiple clases
		var classNames = value.split(/\s+/),
		    className = " " + el.className + " ",
		    l = classNames.length;

		for(var i = 0; i < l; i++) {
			className = className.replace(" " + classNames[i] + " ", " ");
		}
		el.className = className.trim();
	}
}

xObject.toggleClass = function(el, value) {
	var classNames = value.split(/\s+/),
	    i = 0,
	    className;

	// At the end of classNames the loop ends
	while(className = classNames[i++]) {
		// If class exists call removeClass else call addClass
		this[this.hasClass(el, className) ? "removeClass" : "addClass"](el, className);
	}
}

// INSTANCE METHODS //
xObject.prototype.css = function(css, value) {
	// Logical or operator left to right. We return this if we are setting the CSS.. therefore chaining
	return xObject.css(this.el, css, value) || this; 
}

xObject.prototype.hasClass = function(value) {
	return xObject.hasClass(this.el, value);
}

xObject.prototype.addClass = function(value) {
	xObject.addClass(this.el, value);
	return this;
}

xObject.prototype.removeClass = function(value) {
	xObject.removeClass(this.el, value);
	return this;
};

xObject.prototype.toggleClass = function(value) {
	xObject.toggleClass(this.el, value);
	return this;
};

xObject.prototype.html = function(html) {
	if(html) {
		this.el.innerHTML = html;
		return this;
	} else {
		return this.el.innerHTML;
	}
};

xObject.createElement = function(obj) {
	console.log(obj);
	if(!obj || !obj.tagName) {
		throw { message: "Invalid argument" };
	}

	var el = document.createElement(obj.tagName);
	obj.id && (el.id = obj.id); // Logical AND Operation (we are basically verifiing we have a valid obj.id before attempting to set it)
	obj.className && (el.className = obj.className);
	obj.html && (el.innerHTML = obj.html);

	// See if we have attributes to set
	if(typeof obj.attributes !== "undefined") {
		var attr = obj.attributes,
			  prop;

		for(prop in attr) {
			if(attr.hasOwnProperty(prop)) {
				el.setAttribute(prop, attr[prop]); // name, value
			}
		}
	}

	// Create the children
	if(typeof obj.children !== "undefined") {
		var child,
		    i = 0;

		while(child = obj.children[i++]) {
			el.appendChild(this.createElement(child));
		}
	}

	return el;
};

// 
xObject.prototype.append = function(data) {
	// Dealing with an element
	if(typeof data.nodeType !== "undefined" && data.nodeType === 1) {
		this.el.appendChild(data);
	} else if(data instanceof xObject) {
		this.el.appendChild(data.el);
	} else if(typeof data === "string") {
		var html = this.el.innerHTML;
		this.el.innerHTML = html + data;
	}

	return this;
};

// Helper Functions
// Matches every character after a hyphen and converts to Camel Case
function toCamelCase(str) {
	return str.replace(/-([a-z])/ig, function(all, letter) {
		return letter.toUpperCase();
	})
}

var getStyle = (function() {
	if(typeof getComputedStyle !== "undefined") {

		return function(el, cssProp) {
			console.log(cssProp);
			return getComputedStyle(el, null).getPropertyValue(cssProp);
		};
	} else {
		return function(el, cssProp) {
			return el.currentStyle[toCamelCase(cssProp)];
		};
	}
}());

// LANGUAGE EXTENSIONS
// Lets modify the built in string object to ADD trim
// Limit modifications to only mimic features natively supported in other browsers
// Protect native behavior
if(typeof String.prototype.trim === "undefined") {
	String.prototype.trim = function() {
		return this.replace(/^\s+/, "").replace(/\s+$/, "");
	}
}






// var obj = xObject("foo");
// obj.css(this, "color", "red");
// xObject.css("foo", "color", "red");




// // attachEvent setup an event handler for a specific event
// function foo() {
// 	alert('hi');
// 	e.preventDefault();
// 	e.stopPropagation();
// 	e.target
// 	event.srcElement // IE
// 	event.toElement // IE
// 	event.fromElement // IE
// 	event.returnValue = false // similar to e.preventDefault()
// 	event.cancelBubble = true // similar to e.stopPropagation()
// }

// // Dom level 0 event module
// document.onmouseover = function() {
// 	foo();
// 	bar();
// 	wtf();
// };

// // IE EVENT MODEL 5-8
// // document.attachEvent("onclick", foo);
// // document.detachEvent("onclick", foo);

// // Standard Event Model (Webkit & Firefox)
// document.addEventListener("click", foo, false);
// document.removeEventListener("click", foo, false);
