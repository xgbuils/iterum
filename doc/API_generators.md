# Generators

## ValueGenerator (value)

Function which returns a iterator that next method just returns a value indicated by parameter `value`. Then it always returns `{value: undefined, done: true}`.

### usage:
``` javascript
var ValueGenerator = require('es5-generators-utils/value-generator')

var iterator = ValueGenerator(5)

iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
```

### ES6 equivalence:
```
var ValueGenerator = function* (value) {
    yield value;
}
```

## FunctionGenerator (options)

Function which returns a generator based on a set of callbacks passed as a object parameter.

### usage:
``` javascript
var FunctionGenerator = require('es5-generators-utils/function-generator')

var iterator = FunctionGenerator({
    init: function () {
        return 0
    },
    next: function (i) {
        return i + 1
    },
    stop: function (i) {
        return i > 2
    }
})

iterator.next() // {value: 0, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: undefined, done: true}
```

### params:
#### options : Object
##### options.init : Function 
Callback which returns the value gotten by property `value` of first call of `iterator.next()`.
##### options.next (previousValue) : Function 
Callback which returns the value gotten by property `value` of next call of `iterator.next()`. The value returned can be based on previous value passed as parameter or on the context `this` which is the state of iterator.
##### options.stop (previousValue) : Function 
Predicate which indicates the condition when iterator.next() must return `{value: undefined, done: true}`.

### ES6 equivalence:
``` javascript
var FunctionGenerator = function* (options) {
    for (var value = options.init.call(this);
        !options.stop.call(this, value);
        value = options.next.call(this, value)) {
        yield value;
    }
}
```


## RangeGenerator (start, end, increase)

Function which returns a generator based on `start`, `end`, and `increase` parameters

### usage:
``` javascript
var RangeGenerator = require('es5-generators-utils/range-generator')

var iterator = RangeGenerator(0, 6, 2)

iterator.next() // {value: 0, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: undefined, done: true}
```

### params:
#### start : Number
value of property `value` returned by first call of `iterator.next()`.
#### increase : Number 
step which increases property `value` for each call of `iterator.next()`.
#### end : Number
value which indicates that `iterator.next()` does not return any value greater than this.

### ES6 equivalence:
``` javascript
var RangeGenerator = function* (start, end, increase) {
    for (var value = start; value <= end; value += increase) {
        yield value;
    }
}
```