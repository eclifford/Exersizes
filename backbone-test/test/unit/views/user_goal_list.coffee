require ["cs!app/models/user_goal", "cs!app/collections/user_goal", "cs!app/views/user_goal_list", "expect_js", "sinon", "underscore"], (UserGoalModel, UserGoalCollection, UserGoalListView, expect, sinon, _) ->

    suite "UserGoalListView", ->

        test "container created with correct id", ->
            view = new UserGoalListView

            expect(view.el.tagName).to.be("DIV")
            expect(view.el.id).to.be("user-goal-list-view")

        test "render returns view", ->
            view = new UserGoalListView

            result = view.render()

            expect(result).to.be(view)

        test "renders goals when present", ->
            view = new UserGoalListView
            view.user_goals.add [
                {goal: "play the guitar"}
                {goal: "learn German"}
            ]

            view.render()

            expect(view.$('ul').length).to.be(1)
            items = view.$('ul li')
            expect(items.length).to.equal 2
            expect(items[0].innerHTML).to.be('I want to play the guitar')
            expect(items[1].innerHTML).to.be('I want to learn German')

        test "renders expected empty result", ->
            view = new UserGoalListView

            view.render()

            expect(view.$('ul').length).to.be(0)
            expect(view.$('p').text()).to.be('You do not yet have any goals.')

