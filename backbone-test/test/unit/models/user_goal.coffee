define ["cs!app/models/user_goal", "expect_js", "sinon"], (UserGoalModel, expect, sinon) ->

  suite "UserGoalModel Model", ->

    test "default values", ->
      user_goal = new UserGoalModel

      expect(user_goal.get 'goal').to.eql "empty goal..."
      expect(user_goal.get 'status').to.eql UserGoalModel.STATUS_INPROGRESS

    test "initialising with values", ->
        user_goal = new UserGoalModel
            goal: "play the guitar"
            status: UserGoalModel.STATUS_COMPLETED

        expect(user_goal.get 'goal').to.eql "play the guitar"
        expect(user_goal.get 'status').to.eql UserGoalModel.STATUS_COMPLETED

    test "goal cannot be empty", ->
        user_goal = new UserGoalModel
        spy = new sinon.spy
        user_goal.bind 'error', spy

        user_goal.set goal: ""

        expect(spy.calledOnce).to.eql true
        expect(spy.getCall(0).args[1]).to.eql(
            "A UserGoalModel should always have goal text set.")
  return {name:'UserGoalModel suite'}
