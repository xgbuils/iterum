# Lazy methods
Lazy methods are methods that return `Iterum` instances. This methods are lazy because does not iterate over the values to create new instances. 

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

Creates a new `Iterum` instance that iterates over values of iterable object excluding the first `n` values of the iterable object. `n` is `1` by default.

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
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

## .filter (predicate, context = this)

Creates a new `Iterum` instance that iterates over all elements of iterable object that `predicate` returns truthy for.

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
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

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

Creates a new `Iterum` instance that iterates over all values produced by iterable object between `start` and `end` iteration order both included.

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

Creates a new `Iterum` instance that iterates over the beginning values of iterable. Elements are token while predicate returns truthy.

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
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.
