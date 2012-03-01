(function() {
	define(["javascripts/jquery-1.7.1.js"], function($) {
		// Add here later

		return {
			color: "blue",
			size: "large",
			addToCart: function() {
				// inventory.decrement(this);
				// cart.add(this)
			},
			speak: function() {
				alert('woof woof');
			}
		};
	});
})();