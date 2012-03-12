define ["backbone", "app/models/user_goal" ], (Backbone, UserGoalModel) ->
    UserGoalCollection = Backbone.Collection.extend(

      model: UserGoalModel

      url: '/goals/'

      inprogress: ->
          @filter (user_goal) ->
              user_goal.get('status') is UserGoalModel.STATUS_INPROGRESS
    
    )
    UserGoalCollection
