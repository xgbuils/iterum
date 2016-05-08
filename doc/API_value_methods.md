# Value methods
Methods that return some value different of instance of Iterum.

## .build ()

`build` method returns generator with arity `0` extracted of a wrapped Iterum instance.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(0, 2)).build()

var iterator = generator()
iterator.next() // {value: 0, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: undefined, done: true}
```

## .toArray ()

given `builder` Iterum instance and let `iterator === builder.build()()`, `builder.toArray()` method returns array of values that `iterator.next().value` returns step by step

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

Iterum(Range(3, 6))
    .toArray() // [3, 4, 5, 6]
```

## .every (cb, [context = this])

`every` method returns a boolean indicating if `cb` predicate returns true with the whole of iterator values. Additional `context` parameter can be passed and it will be used as a context of `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

Iterum(Range(0, 2))
    .every(function (num) {
        return num < 5 
    }) // true

Iterum(Range(0, 2))
    .every(function (num) {
        return num > 0
    }) // false
```

### `cb (value, index)` callback params 

#### value
The value for each iteration.

#### index
index/position of iteration.

## .indexOf (elem)

Given `elem` element to search, `indexOf` method returns a number indicating the position of element is found or `-1` if it is not found. 

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

Iterum(Range(3, 6))
    .indexOf(5) // 2

Iterum(Range(3, 6))
    .indexOf(100) // -1
```

## .some (cb, [context = this])

`some` method returns a boolean indicating if predicate `cb` returns true with some of iterator values. Additional `context` parameter can be passed and it will be used as a context of `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(0, 2))
iterator.some(function (num) {
    return num === 1
}) // true

iterator.some(function (num) {
    return num === 50
}) // false
```

### `cb (value, index)` callback params 

#### value
The value for each iteration.

#### index
index/position of iteration.
