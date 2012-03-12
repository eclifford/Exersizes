(function() {

  require(["views/app", "collections/images"], function(AppView, Images) {
    var app_view, test;
    this.images = new Images;
    test = {
      wtf: 'hi'
    };
    this.images.fetch();
    app_view = new AppView({
      collection: this.images
    });
    return console.log(test);
  });

}).call(this);
