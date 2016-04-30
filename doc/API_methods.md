# Methods

## .concat (iterator)

Given two iterators `a` and `b`, a.concat(b) returns a new iterator such that `next` method returns concatenation of values of `a` and, then, `b`

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var x = new Iterum(Range(0, 1))
var y = new Iterum(Range(6, 7))
var newIterator = x.concat(y)

newIterator.next() // {value: 0, done: false}
newIterator.next() // {value: 1, done: false}
newIterator.next() // {value: 6, done: false}
newIterator.next() // {value: 7, done: false}
newIterator.next() // {value: undefined, done: true}
```

## .every (cb, context)

Given `iterator`, method `every` returns a boolean indicating if predicate `cb` returns true with the whole of value of iterator. 

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(0, 2))
iterator.every(function (num) {
    return num < 5 
}) // true

iterator.every(function (num) {
    return num < 2
}) // false
```

## .filter (cb, context)

Given `iterator`, method `filter` returns a new iterator such that `next` method returns just the values such that `cb` predicate returns true.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(0, 2))
var newIterator = iterator.filter(function (num) {
    return num < 2
})

newIterator.next() // {value: 0, done: false}
newIterator.next() // {value: 1, done: false}
newIterator.next() // {value: undefined, done: true}
```

## .indexOf (elem)

Given `iterator`, method `indexOf` and element to search, returns a number indicating the position of element is found or `-1` if it is not found. 

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(3, 6))
iterator.indexOf(5) // 2

iterator.indexOf(-100) // -1
```

## .map (cb, context)

Given `iterator`, method map returns a new iterator such that `next` method returns the same as iterator but with `value`properties transformed by the callback `cb`.

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(0, 2))
var newIterator = iterator.map(function (num) {
    return 3 * num
})

newIterator.next() // {value: 0, done: false}
newIterator.next() // {value: 3, done: false}
newIterator.next() // {value: 6, done: false}
newIterator.next() // {value: undefined, done: true}
```

## .slice (start, [end])

Given `iterator`, method `slice` returns a new iterator that returns a slice of values indicated by `start` and `end` parameter

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(5, 100))
var newIterator = iterator.slice(1, 3)

newIterator.next() // {value: 6, done: false}
newIterator.next() // {value: 7, done: false}
newIterator.next() // {value: 8, done: false}
newIterator.next() // {value: undefined, done: true}
```

## .some (cb, context)

Given `iterator`, method `some` returns a boolean indicating if predicate `cb` returns true with some value of iterator. 

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(0, 2))
iterator.some(function (num) {
    return num === 1
}) // true

iterator.some(function (num) {
    return num === 3
}) // false
```

## .toArray ()

Given `iterator`, method `toArray` returns a array of values returned by iterator. 

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = new Iterum(Range(0, 2))

iterator.toArray() // [0, 1, 2]
```
