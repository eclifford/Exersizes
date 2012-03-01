(function() {
	require(["javascripts/jquery-1.7.1", "javascripts/module"], function($, m) {
		console.log('jquery loaded');
		console.log(m);

		//m.speak();

		// Playing around with the call/apply logic
		var x = 10;
		var o = { x: 15 };

		function f(message) {
			console.log(arguments.length);
			console.log(message);
			console.log(this.x);
			alert(this.x);
		}

		f.apply(o, ["invoking the f via call", 1, 2, 3]);



	});
})();