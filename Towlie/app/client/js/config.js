(function() {

  (function() {
    return require.config({
      paths: {
        core: "../lib/akqa/akqa.app.core",
        fascade: "../lib/akqa/akqa.app.fascade",
        permissions: "../lib/akqa/akqa.app.permissions",
        jquery: "../lib/jquery/jquery-1.7.1",
        underscore: "../lib/underscore/underscore-1.3.1",
        backbone: "../lib/backbone/backbone-0.9.1",
        text: "../lib/requirejs/text"
      }
    });
  }).call(this);

}).call(this);
