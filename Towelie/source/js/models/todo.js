define([
  'jquery',
  'core',
  'underscore',
  'backbone'
  ], function() {
  var Todo = Backbone.Model.extend({
    defaults: function() {
      return {
        text: "",
        done: false,
        order: 0
      }
    }
  });
  return Todo;
});