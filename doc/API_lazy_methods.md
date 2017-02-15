# Lazy methods
Lazy methods are methods that not iterate over the iterable object to create a new iterable. They return `Iterum` instances allowing to chain several methods:

### Example:
``` javascript
Iterum([1]) // potentially [1]
    .concat([4]) // potentially [1, 4]
    .map(e => [e, 3 * e]) // potentially [[1, 3], [4, 12]]
    .flatten() // potentially [1, 3, 4, 12]
    .cartesian('ab') /* [
         [1, 'a'], [1, 'b'], [3, 'a'], [3, 'b'],
         [4, 'a'], [4, 'b'], [12, 'a'], [12, 'b']
   ] */
```

## .cartesian (...iterables)

Creates a new `Iterum` instance that iterates over the cartesian product of iterable object and the list of `iterables`.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([6, 3) // potentially [0, 1]
    .cartesian('abc', [1])
    /* potentially [
        [6, 'a', 1],
        [6, 'b', 1],
        [6, 'c', 1],
        [3, 'a', 1],
        [3, 'b', 1],
        [3, 'c', 1]
    ]*/

// transforming to array
[...iterable]
// or iterating over values
for (let val of iterable) {
    ...
}
```

## .concat (...iterables)

Creates a new `Iterum` instance concatenating the iterable object with any additional `iterables`.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(0, 1) // potentially [0, 1]
    .concat([6, 3], new Set('abc'), 'word') 
    // potentially [0, 1, 6, 3, 'a', 'b', 'c', 'w', 'o', 'r', 'd']

// transforming to array
[...iterable] // returns [0, 1, 6, 3, 'a', 'b', 'c']
// or iterating over values
for (let val of iterable) {
    ...
}
```

## .drop (n = 1)

Creates a new `Iterum` instance that iterates over values of iterable object excluding the first `n` values. `n` is `1` by default.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 5, 2, 6, 3]) // potentially [1, 5, 2, 6, 3]
    .drop(2) potentially [2, 6, 3]

// transforming to array
[...iterable] // returns [2, 6, 3]
// or iterating over values
for (let val of iterable) {
    ...
}
```

## .dropWhile (predicate, context = this)

Creates a new `Iterum` instance that iterates over values of iterable object excluding the values dropped from the beginning. Elements are excluded until predicate returns falsey.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 5, 3, 8, 3, 5]) // potentially [1, 5, 3, 8, 3, 5]
    .dropWhile(num => num % 2 === 1) potentially [8, 3, 5]

// transforming to array
[...iterable] // returns [8, 3, 5]
// or iterating over values
for (let val of iterable) {
    ...
}
```

### predicate (value, index, iterable) params

#### value
Each value that iterable object produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default it is the iterable object.

## .entries ()

Creates a new `Iterum` instance that iterates over pairs `[index, value]` where `value` is the value that produces the iterable object and `index` is the iteration order of `value` starting from `0`.


### usage:
``` javascript
const Iterum = require('iterum')

const iterableEntries = Iterum('abc') // potentially ['a', 'b', 'c']
    .entries() potentially [[0, 'a'], [1, 'b'], [2, 'c']]

// transforming to array
[...iterableEntries] // returns [[0, 'a'], [1, 'b'], [2, 'c']]
// or iterating over values
for (let val of Iterum(iterable).entries()) {
    ...
}
```

## .flatten (depth = 1)

Creates a new `Iterum` instance that iterates over values of iterable object flattened with `depth`.


### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([['abc', ['def']], 3]) // potentially [['abc', ['def']], 3]
iterable.flatten(0) potentially [['abc', ['def']], 3]
iterable.flatten() potentially ['abc', ['def'], 3]
iterable.flatten(1) potentially ['abc', ['def'], 3]
iterable.flatten(2) potentially ['a', 'b', 'c', 'def', 3]
iterable.flatten(3) potentially ['a', 'b', 'c', 'd', 'e', 'f', 3]
iterable.flatten(Infinity) potentially ['a', 'b', 'c', 'd', 'e', 'f', 3]
```

## .filter (predicate, context = this)

Creates a new `Iterum` instance that iterates over all values produced by iterable object that `predicate` returns truthy for.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(2, 10) // potentially [2, 3, ... 9, 10]
    .filter(num => num < 5) potentially [2, 3, 4]

// transforming to array
[...iterable] // returns [2, 3, 4]
// or iterating over values
for (let val of iterable) {
    ...
}
```

### predicate (value, index, iterable) params

#### value
Each value that iterable object produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is traversing.

### context
The object that is referenced by `this` inside the `predicate` callback. By default it is the iterable object.

## .map (cb, context = this)

Creates a new `Iterum` instance that iterates over all values produced by iterable object transformed by `cb` callback.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([7, 3, 1, 4]) // potentially [7, 3, 1, 4]
    .map(num => 3 * num) // potentially [21, 9, 3, 12]

// transforming to array
[...iterable] // returns [21, 9, 3, 12]
// or iterating over values
for (let val of iterable) {
    ...
}
```

### cb (value, index, iterable) params

#### value
Each value that `this` iterable produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `cb` callback. By default is the iterable object.

## .padEnd (length = 0, value = undefined)

Creates a new `Iterum` instance that iterates over the same values as iterable object and if this produces less values than `length`, it keeps returning `value` values until producing `length` values.


### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([3, 2, 8]) // potentially [3, 2, 8]
iterable.padEnd(5, 0) potentially [3, 2, 8, 0, 0]
iterable.padEnd(7, 1) potentially [3, 2, 8, 1, 1, 1, 1]
iterable.padEnd(3, 0) potentially [3, 2, 8]
iterable.padEnd(0, 5) potentially [3, 2, 8]
iterable.padEnd() potentially [3, 2, 8]
iterable.padEnd(Infinity, 2) potentially [3, 2, 8, 2, 2, 2, 2, 2...]
```

## .repeat(n = Infinity)
Creates a new `Iterum` instance that iterates over all values produced by iterable object for `n` times.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([7, 3, 1]) // potentially [7, 3, 1]
const a = iterable.repeat(4) // potentially [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1]
const b = iterable.repeat() // potentially [7, 3, 1, 7, 3, 1, 7, 3, 1, ...]

// transforming to array
[...a] // returns [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1]
// be careful with [...b]! it creates infinite array 
```

## .slice (start = 0, end = Infinity)

Creates a new `Iterum` instance that iterates over all values produced by iterable object between `start` and `end` numbers both included.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(5, 100) // potentially [5, 6 ... 99, 100]
    .slice(1, 4) // potentially [6, 7, 8]

// transforming to array
[...iterable] // returns [6, 7, 8]
// or iterating over values
for (let val of iterable) {
    ...
}
```

## .take (n = 1)

Creates a new `Iterum` instance that iterates over the `n` first values of the iterable object. `n` is `1` by default.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(1, 2000) // potentially [1, 2, ... 2000]
    .take(3) potentially [1, 2, 3]

// transforming to array
[...iterable] // returns [1, 2, 3]
// or iterating over values
for (let val of iterable) {
    ...
}
```

## .takeWhile (predicate, context = this)

Creates a new `Iterum` instance that iterates over the beginning values of iterable. Elements are taken while predicate returns truthy.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.([2, 5, 8, 10, 9, 8, 7, 6, 5, 4]) // potentially [2, 5, 8, 10, 9, 8, 7, 6, 5, 4]
    .takeWhile(num => num % 3 === 2) potentially [2, 5, 8]

// transforming to array
[...iterable] // returns [2, 5, 8]
// or iterating over values
for (let val of iterable) {
    ...
}
```

### predicate (value, index, iterable) params

#### value
Each value that `this` iterable produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default it is the iterable object.

## .zip (...iterables)

Creates a new `Iterum` instance that iterates over iterable values grouped by tuples, the first of which contains the first elements of the given `iterables`, the second of which contains the second elements of the given `iterables`, and so on.


### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([3, 2, 8]) // potentially [3, 2, 8]
iterable.zip([4, 5, 6]) // potentially [[3, 4], [2, 5], [8, 6]]
iterable.zip([4, 5, 6], 'abc') // potentially [[3, 4, 'a'], [2, 5, 'b'], [8, 6, 'c']]
iterable.zip([10, 0]) potentially [[3, 10], [2, 0]]
iterable.zip() // potentially [[3], [2], [8]]
```
