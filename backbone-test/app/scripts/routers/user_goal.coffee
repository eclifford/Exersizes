define ["backbone"], (Backbone) ->

    UserGoalRouter = Backbone.Router.extend
        routes:
            "goals/": "user_goals"
            "goals/:id/": "getUserGoal"

        getUserGoal: (id) ->
            console.log "Getting a goal"

        user_goals: ->
            me = "foo"

    UserGoalRouter

