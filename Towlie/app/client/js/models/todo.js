(function() {

  define(["underscore", "backbone"], function(_, Backbone) {
    var Todo;
    Todo = Backbone.Model.extend({
      defaults: function() {
        return {
          text: "",
          done: false,
          order: 0
        };
      }
    });
    return Todo;
  });

}).call(this);
