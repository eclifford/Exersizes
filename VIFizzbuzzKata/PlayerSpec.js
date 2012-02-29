describe('FizzBuzz', function() {
  beforeEach(function() {

  });

  it('should return fizz for multiples of three', function() {
    var result = fizzBuzz.getResult(3);
    expect(result).toEqual('fizz');
  });
  it('should return buzz for multiples of five', function() {
    var result = fizzBuzz.getResult(5);
    expect(result).toEqual('buzz');
  });

});