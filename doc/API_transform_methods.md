# Transform methods
Methods that return instance of Iterum and are able to be chained with other Iterum methods.

## .concat (generator)

Given a generator wrapped in Iterum instance and another `generator`, `concat` method returns another Iterum instance that wraps the concatenation of two mentioned generators. 

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(0, 1))
    .concat(Range(6, 7))
    .build()

var iterator = generator()
iterator.next() // {value: 0, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 7, done: false}
iterator.next() // {value: undefined, done: true}
```

## .filter (cb, [context = this])

Given a generator wrapped in Iterum instance, `filter` method returns another Iterum instance that wraps a generator that returns just the values such that `cb` predicate returns true. Additional `context` parameter can be passed and it will be used as a context of `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(2, 10))
    .filter(function (num) {
        return num < 5
    })
    .build()

var iterator = generator()
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

Given a generator wrapped in Iterum instance, `map` method returns another Iterum instance that wraps a generator that returns and iterator such that `next` method returns the same as iterator but with `value` properties transformed by the callback `cb`. Additional `context` parameter can be passed and it will be used as a context of `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(0, 2))
    .map(function (num) {
        return 3 * num
    })
    .build()

var iterator = generator()
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

Given a generator wrapped in Iterum instance, `slice` method returns another Iterum instance that wraps a generator that returns an slice of previous generator.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(5, 100))
    .slice(1, 3)
    .build()

var iterator = generator()
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 7, done: false}
iterator.next() // {value: 8, done: false}
iterator.next() // {value: undefined, done: true}
```
