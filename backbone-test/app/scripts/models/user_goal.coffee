define ["underscore", "backbone"], (_, Backbone) ->

  UserGoalModel = Backbone.Model.extend {

    defaults:
      goal: "empty goal..."
      status: 'inprogress'

    initialize: ->
      @set
        goal: @get("goal") or @defaults.goal
        status: @get("status") or @defaults.status

    validate: (attrs) ->
        if attrs.goal is ""
            "A UserGoalModel should always have goal text set."
    }, {
    STATUS_INPROGRESS: 'inprogress'
    STATUS_COMPLETED: 'completed'
    }

  UserGoalModel
