# Value methods
Methods that return some value different of Iterum instance.

## .build ()

`build` method returns the 0-arity generator wrapped in Iterum instance.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterumInstance = Range(0, 2)
var generator = iterumInstance.build()

var iterator = generator()
iterator.next() // {value: 0, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: undefined, done: true}
```

## .toArray ()

Given Iterum instance, `toArray` method returns the same array of values as iterator obtained by build()() returns step by step

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

Iterum(Range(3, 6))
    .toArray() // [3, 4, 5, 6]

// it returns the same as iterator returns step by step:
var iterator = Iterum(Range(3, 6)).build()()
iterator.next() // {value: 3, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: 6, done: false}
```

## .every (cb, [context = this])

`every` method returns a boolean indicating if `cb` predicate returns true with all of values. Additional `context` parameter can be passed and it will be used as a context of `cb`.

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

### `cb (value, index, iterum)` callback params

#### value
The value for each iteration.

#### index
index/position of iteration.

#### iterum
The iterum instance was called upon.

## .forEach (cb, context)

`forEach` method traverses and call `cb` callback with the values of Iterum instance. Additional `context` parameter can be passed and it will be used as a context of `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

Iterum(Range(0, 2))
    .forEach(function (num, index) {
        console.log(index + ': ', num)
    })
```

### `cb (value, index, iterum)` callback params

#### value
The value for each iteration.

#### index
index/position of iteration.

#### iterum
The iterum instance was called upon.

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

## .reduce (cb, initialValue)

`reduce` method applies a function against an accumulator and each value of the Iterum instance (from left-to-right) to reduce it to a single value. `initialValue` can be passed and it will be used as the initial value of accumulator.

### usage:
``` javascript
var Iterum = require('iterum')
var List = Iterum.List

Iterum(List([5, 2, 1]))
    .reduce(function (a, b) {
        return a - b
    }) // 5 - 2 - 1 === 2
```

### `cb (previousValue, currentValue, currentIndex, iterum)` callback params

#### previousValue
The value previously returned in the last invocation of the callback, or initialValue, if supplied.

#### currentValue
The current element being processed in the iterum instance.

#### currentIndex
index/position of iteration.

#### iterum
The iterum instance was called upon.

## .reduceRight (cb, initialValue)

`reduceRight` method applies a function against an accumulator and each value of the iterum instance (from right-to-left) has to reduce it to a single value. `initialValue` can be passed and it will be used as the initial value of accumulator.

### usage:
``` javascript
var Iterum = require('iterum')
var List = Iterum.List

Iterum(List([5, 2, 1]))
    .reduceRight(function (a, b) {
        return a - b
    }) // 1 - 2 - 5 === -6
```

### `cb (previousValue, currentValue, currentIndex, iterum)` callback params

#### previousValue
The value previously returned in the last invocation of the callback, or initialValue, if supplied.

#### currentValue
The current element being processed in the iterum instance.

#### currentIndex
index/position of iteration.

#### iterum
The iterum instance was called upon.

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

### `cb (value, index, iterum)` callback params

#### value
The value for each iteration.

#### index
index/position of iteration.

#### iterum
The iterum instance was called upon.
