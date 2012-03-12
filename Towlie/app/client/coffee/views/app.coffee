define [ "jquery", "core", "text!/templates/test.html", "underscore", "backbone", "views/Image" ], ($, core, testTemplate, _, Backbone, ImageView) ->
  AppView = Backbone.View.extend(
    el: $("#todoapp")
    # testTemplate: _.template(testTemplate)
    # events:
    #   "click #btnClickMe": "buttonClick"

    # buttonClick: ->
    #   alert "MUAHAHAHAA"
    #   core.publish "buttonClick", this,
    #     message: "i can haz cheezburger"

    # initialize: ->
    #   _.bindAll this, "render"
    #   @input = @$("#new-todo")
    #   core.subscribe "buttonClick", (context, data) ->
    #     core.log 2, "testing"

    #   @render()

    # render: ->
    #   $(@el).html @testTemplate()
    #   console.log "renderDone"
    #   core.publish "renderDone", this, null

    #   Images.()

    initialize: -> 

      _.bindAll this, 'render'  

      @collection.bind "add", @render
      @collection.bind "reset", @render
      $("div#todolist").html('')

    render: ->
      core.log(1, @collection)
      @addAll()
      @

    addAll: ->
      $(@el).html('')
      $('div#todoapp').html('')
      _.each @collection.models, (post) =>
        @addOne(post)

    addOne: (post) ->
      console.log('add')
      view = new ImageView
        model: post
      view.displayComments = @displayComments
      view.render()
      $(@el).append(view.el) 
  )
  AppView
