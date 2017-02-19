# Eager methods
Methods that iterates over values of iterable object to compute the value that returns.

## .every (predicate, context = this)

Checks if `predicate` returns truthy for all value of iterable object. Iteration is stopped once predicate returns falsey.

### usage:
``` javascript
const Iterum = require('iterum')

Iterum.range(0, 3)
    .every(num => num < 5) // true

Iterum.range(0, 3)
    .every(num => num > 0) // false
```

### `predicate` params

#### value
Each value that iterable object produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

## .find (predicate, context = this)

Returns the first value of iterable object that `predicate` returns truthy for. 
### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.find(num => num % 4 === 0) // 8
iterable.find(num => num % 4 === 2) // undefined
```

### `predicate` params

#### value
Each value that iterable object produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

## .findEntry (predicate, context = this)

Returns the first entry (pair of index and value) of iterable object that `predicate` returns truthy for.
### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.findEntry(num => num % 4 === 0) // [1, 8]
iterable.findEntry(num => num % 4 === 2) // undefined
```

### `predicate` params

#### value
Each value that iterable object produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

## .findIndex (predicate, context = this)

Returns the first index of iterable object that `predicate` returns truthy for. If `predicate` does not return thuthy, it returns `-1`

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.findIndex(num => num % 4 === 0) // 1
iterable.findIndex(num => num % 4 === 2) // -1
```

### `predicate` params

#### value
Each value that iterable object produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

## .forEach (cb, context)

Traverses all values calling `cb` with the values of iterable object.

### usage:
``` javascript
const Iterum = require('iterum')

Iterum([0, 2, 3, 5, 6, 8])
    .forEach(function (num, index) {
        console.log(index + ': ', num)
    })
```

### `cb` params

#### value
Each value that iterable object produces.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

## .includes (value, fromIndex = 0)

It behaves over iterable object like [Array.prototype.includes](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/includes).

### usage
``` javascript
const Iterum = require('iterum')

Iterum([1, 4, 3, 5, 3])
    .includes(3) // 2

Iterum([1, 4, 3, 5, 3], 2)
    .includes(100) // true

Iterum([1, 4, NaN, 5, 3], 2)
    .indexOf(NaN) // true
```

## .indexOf (value, fromIndex = 0)

It behaves over iterable object like [Array.prototype.includes](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/indexOf).

### usage:
``` javascript
const Iterum = require('iterum')

Iterum([1, 4, 3, 5, 3])
    .indexOf(3) // 2

Iterum([1, 4, 3, 5, 3], 1)
    .indexOf(100) // -1

Iterum([1, 4, NaN, 5, 3], 1)
    .indexOf(NaN) // -1
```

## .reduce (cb, initialValue)

`reduce` method applies a `cb` function against an accumulator and each value that produces iterable object (from left-to-right) to reduce it to a single value. `initialValue` can be passed and it will be used as the initial value of accumulator. If initial value is not passed, it takes the first value of iterable as initial value.

### usage:
``` javascript
const Iterum = require('iterum')

Iterum([5, 2, 1])
    .reduce((a, b) => a - b) // 5 - 2 - 1 === 2
```

### `cb` params

#### accumulator
The value previously returned in the last invocation of the `cb` callback, or `initialValue`, if supplied.

#### value
The current value being processed in the iterable object.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

## .reduceRight (cb, initialValue)

`reduceRight` method applies a function against an accumulator and each value of produces iterable object (from right-to-left) to reduce it to a single value. `initialValue` can be passed and it will be used as the initial value of accumulator. If `initialValue` is not passed, it takes the last value of iterable as initial value.

### usage:
``` javascript
const Iterum = require('iterum')
const List = Iterum.List

Iterum([5, 2, 1])
    .reduceRight(function (a, b) {
        return a - b
    }) // 1 - 2 - 5 === -6
```

### `cb` params

#### accumulator
The value previously returned in the last invocation of the callback, or initialValue, if supplied.

#### value
The current value being processed in the iterable object.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterable
The iterable object that is being traversed.

## .some (predicate, context = this)
Checks if `predicate` returns truthy for any value of iterable object. Iteration is stopped once predicate returns truthy.

### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(0, 2)

iterable.some(num => num === 1) // true
iterable.some(num => num === 1) // false
```

### `cb` params

#### value
The current value being processed in the iterable object.

#### index
It represents the iteration order of `value`s of iterable object starting from `0`.

#### iterum
The iterable object that is being traversed.

### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.