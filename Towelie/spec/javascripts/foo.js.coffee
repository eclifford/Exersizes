describe "foo", ->
	it "it is not a bar", ->
		v = new Foo()
		expect(v.bar()).toEqual(false)