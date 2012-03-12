Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'b3481714257943a4974e4e7ba99eb357');
Instagram.set('client_secret', '424e2760ecfb4a6e9be301257d401a80');

module.exports = (app) ->
  app.get "/", (req, res) ->
    res.render "index",
      title: "Towelie Framework"

  app.get "/json", (req, res) ->
  	res.json([{'image1': "wtf.jpg"},{'image1': "wtf.jpg"},{'image1': "wtf.jpg"}]);

  app.get "/instagram/popular", (req, res) ->

    Instagram.users.self
      access_token: '2991386.b348171.7d1f8edf197d466c8b1539123a8fea2e'
      complete: (media)->
        res.json media
      error: (errorMessage, errorObject, caller) ->
        console.log errorMessage 