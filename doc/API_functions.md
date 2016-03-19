# Functions

## map (generator, cb)

Given `generator` and callback `cb`, `map` returns a new generator that `iterator#next` returns values mapped with `cb`.

### usage:
``` javascript
var RangeGenerator = require('es5-generators-utils/range-generator')
var map = require('es5-generators-utils/fn/map')

var MapGenerator = map(RangeGenerator, function (x) {
    return x + 3
})
var iterator = MapGenerator(0, 2)

iterator.next() // {value: 3, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
```

## compose (...generators)

Given a list of generator parameters, `compose` returns a new generator that is the composition of its.

### usage:
``` javascript
var compose = require('es5-generators-utils/fn/compose')

// ...
```

Pending to extend documentation of compose...
