(function() {

  define(["jquery", "core", "text!/templates/test.html", "underscore", "backbone"], function($, core, testTemplate, _, Backbone) {
    var ImageView;
    ImageView = Backbone.View.extend({
      className: 'post',
      initialize: function() {
        return _.bindAll(this, "render");
      },
      render: function() {
        var blah;
        console.log('PostView render');
        console.log(this.model.toJSON()['caption']['text']);
        blah = _.template(testTemplate, this.model.toJSON());
        console.log(blah);
        return $(this.el).html(blah);
      }
    });
    return ImageView;
  });

}).call(this);
