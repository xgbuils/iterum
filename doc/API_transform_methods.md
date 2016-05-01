# Transform methods
Methods that returns instance of Iterum and can be chained with other methods.

## .concat (generator)

Given Iterum instance that wraps a generator, `concat` method concats another generator to it. 

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var gen = Iterum(Range(0, 1))
    .concat(Range(6, 7))
    .build()
var iterator = gen()

iterator.next() // {value: 0, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 7, done: false}
iterator.next() // {value: undefined, done: true}
```

## .filter (cb, [context = this])

Given Iterum instance that wraps a generator, `filter` method stores another generator that returns just the values such that `cb` predicate returns true. Additional `context` parameter can be passed and it will be used as a context of `cb`.

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

## .map (cb, [context = this])

Given Iterum instance that wraps a generator, `map` method stores another generator that returns and iterator such that `next` method returns the same as iterator but with `value` properties transformed by the callback `cb`. Additional `context` parameter can be passed and it will be used as a context of `cb`.

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
## .slice ([start = 0], [end = Infinity])

Given Iterum instance that wraps a generator, `slice` method stores a new generator that returns an slice of previous generator.

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
