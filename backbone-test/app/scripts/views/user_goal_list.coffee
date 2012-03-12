define ["underscore", "backbone", "jquery", "text!templates/user_goal_list.html", "app/collections/user_goal"], (_, Backbone, $, UserGoalListTemplate, UserGoalCollection) ->

    UserGoalListView = Backbone.View.extend(
      id: 'user-goal-list-view'

      initialize: ->
          @user_goals = new UserGoalCollection

      render: (event) ->
        compiled_template = _.template UserGoalListTemplate
        $(@el).html compiled_template user_goals: @user_goals.models
        this

      events:
        "click .reset": "reset"

      reset: (event) ->
        'foo'

    )
    UserGoalListView
