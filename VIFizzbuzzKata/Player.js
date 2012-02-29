

var fizzBuzz = function() {
  var getThis = function(theValue) {
    alert(theValue);
  };
  var retThis = function(theValue) {
    alert(theValue);
  };
  var getResult = function(number) {
    if (number % 3 === 0) {
      return 'fizz';
    }
    if (number % 5 === 0) {
      return 'buzz';
    }
  };
  var getMyResult = function(number) {
    return 'fuzz';
  };
  return {
    getResult: getResult
  };

}();

