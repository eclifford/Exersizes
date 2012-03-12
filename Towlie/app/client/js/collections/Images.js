(function() {

  define(["underscore", "backbone", "../models/image"], function(_, Backbone, Image) {
    var Images;
    return Images = Backbone.Collection.extend({
      model: Image,
      url: "/instagram/popular"
    });
  });

}).call(this);
