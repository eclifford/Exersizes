require ["cs!app/routers/user_goal", "expect_js", "sinon"], (UserGoalRouter, expect, sinon) ->

    suite "UserGoalRouter", ->

        setup ->
            @router = new UserGoalRouter
            @route_spy = sinon.spy()
            # Backbone allows start once per page load.
            # Backbone requires window to be defined.
            # Is there someway to do this as part of the require?
            if not window?
                global.window = document.createWindow()
                global.navigator = window.navigator
                global.test_window_defined = true
            Backbone.history.start({silent:true})
            @router.navigate("elsewhere")

        teardown ->
            Backbone.history.stop()
            if test_window_defined?
                delete global.test_window_defined
                delete global.navigator
                delete window

        test "routes user goal list", ->
            @router.bind "route:user_goals", @route_spy

            @router.navigate("goals/", true)
            expect(@route_spy.called).to.equal(true)
