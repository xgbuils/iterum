# Transform methods
Methods that return instance of Iterum and are able to be chained with other Iterum methods. The methods do not compute any value that wrapped generator potentially can provide. Instead, these methods create new Iterum instances with new wrapped generators.

## .concat (generator)

Given a generator wrapped in Iterum instance and another `generator`, `concat` method returns another Iterum instance that wraps the concatenation of two mentioned generators. Parameter `generator` can be a generator function or Iterum instance.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(0, 1)) // potentially [0, 1]
    .concat(Range(6, 7)) potentially [0, 1, 6, 7]
    .build() // returns wrapped generator

var iterator = generator() // creates iterator
iterator.next() // {value: 0, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 7, done: false}
iterator.next() // {value: undefined, done: true}
```

## .filter (cb, [context = this])

Given `Iterum` instance that provides a sequence of values, `filter` method returns another `Iterum instance` that provides this sequence filtered by  just the values such that `cb` predicate returns true. Additional `context` parameter can be passed and it will be used as a context of `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(2, 10)) // potentially [2, 3, ... 9, 10]
    .filter(function (num) {
        return num < 5
    }) potentially [2, 3, 4]
    .build() // returns wrapped generator

var iterator = generator() // creates iterator
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: 4, done: false}
newIterator.next() // {value: undefined, done: true}
```

### `cb (value, index, generator)` callback params

#### value
The value for each iteration.

#### index
index/position of iteration.

#### generator
The generator was called upon.

## .map (cb, [context = this])

Given `Iterum` instance that provides a sequence of values, `map` method returns another Iterum instance that provides another sequence of value based on applying `cb` callback for each value of first mentioned sequence. Additional `context` parameter can be passed and it will be used as a context of `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(0, 2)) // potentially [0, 1, 2]
    .map(function (num) {
        return 3 * num
    }) // potentially [0, 3, 6]
    .build() // returns wrapped generator

var iterator = generator() // creates iterator
iterator.next() // {value: 0, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: undefined, done: true}
```

### `cb (value, index, generator)` callback params

#### value
The value for each iteration.

#### index
index/position of iteration.

#### generator
The generator was called upon.


## .slice ([start = 0], [end = Infinity])

Given `Iterum` instance that provides a sequence of values,  `slice` method returns another Iterum instance that provides a slice of the original sequence.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(5, 100)) // potentially [5, 6 ... 99, 100]
    .slice(1, 4) // potentially [6, 7, 8]
    .build() // returns wrapped generator

var iterator = generator() // creates iterator
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 7, done: false}
iterator.next() // {value: 8, done: false}
iterator.next() // {value: undefined, done: true}
```
