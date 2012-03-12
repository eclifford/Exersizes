define([
  'jquery',
  'core',
  'text!templates/test.html',
  'underscore',
  'backbone'
  ], function($, core, testTemplate) {

  var AppView = Backbone.View.extend({
	
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    testTemplate: _.template(testTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
    	"click #btnClickMe": "buttonClick"
    },

    buttonClick: function() {
    	alert('MUAHAHAHAA');
    	core.publish('buttonClick', this, {message: 'i can haz cheezburger'});
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

      _.bindAll(this, 'render');
      this.input    = this.$("#new-todo");

      core.subscribe('buttonClick', function(context, data) {
      	core.log(2, "testing");
      });

      this.render();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      $(this.el).html(this.testTemplate());
    	console.log('renderDone');
      core.publish('renderDone', this, null);

    },

    // // Add a single todo item to the list by creating a view for it, and
    // // appending its element to the `<ul>`.
    // addOne: function(todo) {
    //   var view = new TodoView({model: todo});
    //   this.$("#todo-list").append(view.render().el);
    // },

    // // Add all items in the **Todos** collection at once.
    // addAll: function() {
    //   Todos.each(this.addOne);
    // },

  });
  return AppView;
});