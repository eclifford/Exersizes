define [ "jquery", "core", "text!/templates/test.html", "underscore", "backbone"], ($, core, testTemplate, _, Backbone) ->
  ImageView = Backbone.View.extend(
    className: 'post'

    initialize: ->
      _.bindAll this, "render"
    
    render: ->
      console.log 'PostView render'
      console.log(@model.toJSON()['caption']['text'])
      blah = _.template(testTemplate, @model.toJSON())
      console.log blah
      $(@el).html blah
      # model = 
      #   showComments: @displayComments
      #   data: @model.toJSON()

      # $(@el).html window.JST['post'](model)

      # console.log 'displayingComments', @displayComments
      # if @displayComments
      #   $('div#comments').html('')
      #   @comments = new App.Collections.Comments()
      #   @comments.fetch data:
      #     id: @model.get('_id')
      #     success: =>
      #       console.log 'comments fetch', @comments
      #       commentList = new App.Views.CommentListView(
      #         el: 'div#comments'
      #         collection: @comments
      #       )
  )
  ImageView