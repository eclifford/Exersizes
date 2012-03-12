require ["cs!app/models/user_goal", "cs!app/collections/user_goal", "expect_js", "sinon", "underscore"], (UserGoalModel, UserGoalCollection, expect, sinon, _) ->

  suite "UserGoalCollection", ->

    test "UserGoalModels can be added as objects", ->
      goals = new UserGoalCollection
      expect(goals.length).to.eql 0

      goals.add goal: "play the guitar"

      expect(goals.length).to.eql 1

    test "UserGoalModels can be added as arrays", ->
      goals = new UserGoalCollection

      goals.add [
        {goal: "play the guitar"}
        {goal: "learn German"}
        ]

      expect(goals.length).to.eql 2

    test "plural goals url", ->
      goals = new UserGoalCollection

      expect(goals.url).to.eql '/goals/'

    test "inprogress returns only inprogress goals", ->
        goals = new UserGoalCollection
        goals.add [
            {status: UserGoalModel.STATUS_INPROGRESS}
            {status: UserGoalModel.STATUS_INPROGRESS}
            {status: UserGoalModel.STATUS_COMPLETED}
            ]

        inprogress_goals = goals.inprogress()

        expect(inprogress_goals.length).to.eql 2
        _.each inprogress_goals, (goal) ->
            expect(goal.get 'status').to.eql UserGoalModel.STATUS_INPROGRESS
