
define ["underscore", "backbone", "../models/image" ], (_, Backbone, Image) ->
	Images = Backbone.Collection.extend(
		model: Image
		url: "/instagram/popular"
	)
