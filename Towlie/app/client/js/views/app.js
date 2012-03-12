(function() {

  define(["jquery", "core", "text!/templates/test.html", "underscore", "backbone", "views/Image"], function($, core, testTemplate, _, Backbone, ImageView) {
    var AppView;
    AppView = Backbone.View.extend({
      el: $("#todoapp"),
      initialize: function() {
        _.bindAll(this, 'render');
        this.collection.bind("add", this.render);
        this.collection.bind("reset", this.render);
        return $("div#todolist").html('');
      },
      render: function() {
        core.log(1, this.collection);
        this.addAll();
        return this;
      },
      addAll: function() {
        var _this = this;
        $(this.el).html('');
        $('div#todoapp').html('');
        return _.each(this.collection.models, function(post) {
          return _this.addOne(post);
        });
      },
      addOne: function(post) {
        var view;
        console.log('add');
        view = new ImageView({
          model: post
        });
        view.displayComments = this.displayComments;
        view.render();
        return $(this.el).append(view.el);
      }
    });
    return AppView;
  });

}).call(this);
