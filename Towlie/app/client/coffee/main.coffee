
require [ "views/app", "collections/images" ], (AppView, Images) ->
	@images = new Images
	test = 
		wtf: 'hi'
	@images.fetch();
	app_view = new AppView(
		collection: @images
	)
	console.log(test);
