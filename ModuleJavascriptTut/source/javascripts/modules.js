
Core.create_module("search-box", function(sb) {
	var input, button, reset;
	return {
		init: function() {
			input = sb.find("#search_input")[0],
			button = sb.find("#search_button")[0],
			reset = sb.find("#quit_search")[0];

			sb.addEvent(button, "click", this.handleSearch);
			sb.addEvent(reset, "reset", this.quitSearch);
		},
		destroy: function() {
			sb.removeEvent(button, "click", this.handleSearch);
			sb.removeEvent(reset, "reset", this.quitSearch);
			input = button = reset = null;
		},
		handleSearch : function() {
			var query = input.value;
			if (query) {
				sb.notify({
					type: 'perform-search',
					data: query
				});
			} 
		},
		quitSearch: function() {
			input.value = "";
			sb.notify({
				type: 'quit-search',
				data: null
			});
		}
	}
});

Core.create_module("filters-bar", function(sb) {
	var filters;

	return {
		init: function() {
			filters = sb.find('a');
			sb.addEvent(filters, "click", this.filterProducts);
		},
		destroy: function() {
			filters = null;
			sb.removeEvent(filters, "click", this.filterProducts);
		},
		filterProducts: function(e) {
			sb.notify({
				type: 'change-filter',
				data: e.currentTarget.innerHTML
			});
		}
	}
});

Core.create_module("product-panel", function(sb) {
	var products;

	function eachProduct(fn) {
		var i = 0, product;
		for ( ; product = products[i++]; ) {
			fn(product);
		}
	}
	function reset() {
		eachProduct(function(product) {
			product.style.opacity = "1";
		});
	}

	return {
		init: function() {
			var that = this;

			products = sb.find("li");
			sb.listen({
				'change-filter': this.change_filter,
				'reset-filter': this.reset,
				'perform-search': this.search,
				'quit-search': this.reset
			});

			eachProduct(function(product) {
				sb.addEvent(product, 'click', that.addToCart);
			});
		},
		destroy: function() {
			var that = this;
			eachProduct(function(product) {
				sb.removeEvent(product, 'click', that.addToCart);
			});
			sb.ignore(['change-filter', 'reset-filter', 'perform-search', 'quit-search']);
		},
		reset: reset,
		change_filter: function(filter) {
			reset();
			eachProduct(function(product) {
				if(product.getAttribute("data-8088-keyword").toLowerCase().indexOf(filter.toLowerCase()) < 0) {
					product.style.opacity = '0.2';
				}
			});
		},
		search: function(query) {
			query = query.toLowerCase();
			eachProduct(function(product) {
				if(product.getElementsByTagName('p')[0].innerHTML.toLowerCase().indexOf(query.toLowerCase()) < 0) {
					product.style.opacity = '0.2';
				}
			});
		},
		addToCart: function(e) {
			var li = e.currentTarget;
			sb.notify({
				type: 'add-item',
				data: {id: li.id, name: ls.getElementsById('p')[0].innerHTML, price: parseInt(li.id, 10)}
			})
		}
	}
});

Core.create_module('shopping-cart', function(sb) {
	var cart, cartItems;

	return {
		init: function() {
			cart = sb.find("ul")[0];
			cartItems = {};

			sb.listen({
				'add-item': this.addItem;
			});
		},
		destroy: function() {
			cart = cartItems = null;
			sb.ignore(['add-item']);
		},
		addItem: function(product) {
			var entry;
			entry = sb.find("#cart-" + product.id + ' .quantity')[0];
			if(entry) {
				entry.innerHTML = parse(entry.innerHTML, 10) + 1;
				cartItems[product.id]++;
			}
			else {
				entry = sb.create_element("li", {id: "cart-" + product.id, children: [
						sb.createElement("span", { 'class': 'product_name', text: product.name}),
						sb.createElement("span", { 'class': 'quantity', text: 1),
						sb.createElement("span", { 'class': 'price', text: '$' + product.id.toFixed(2)})
					], 
					'class': 'cart_entry' });
				cart.appendChild(entry);
				cartItems[product.id] = 1;
			}
		}
	}
});
