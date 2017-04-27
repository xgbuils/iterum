# API

## Iterum (iterable)

It builds an Iterum instance based on `iterable` parameter. `Iterum` instance can be created using `new` or not. The constructor throws a `TypeError` if `iterable` object does not implements the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

`Iterum` instance that is created has the same behaviour as `iterable` using [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) or [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) but is enhanced but methods exposed below.

### Example:

``` javascript
const Iterum = require('iterum')

const array = [1, 2, 3]
const a = Iterum(array)
// or with new
const b = new Iterum(array)

// spread operator produces the same array:
[...a] // returns [1, 2, 3]
[...b] // returns [1, 2, 3]
[...array] // returns [1, 2, 3]

// and Iterum instance behaves equal with for..of
let index = 0
for (let x of a) {
    // always x === array[index] 
    ++index
}

// and constructor can be used with the whole iterable types:
const stringIterable = Iterum('abc')
const typedArrayIterable = Iterum(Uint8Array([127, 0, 0, 1]))
const setIterable = Iterum(new Set().add(2).add(5).add(6))
```

## Object methods

### .cartesian (...iterables)

Creates a new `Iterum` instance that iterates over the cartesian product of iterable object and the list of `iterables`.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([6, 3]) // potentially [0, 1]
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

### .concat (...iterables)

Creates a new `Iterum` instance concatenating the iterable object with any additional `iterables`.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(0, 1) // potentially [0, 1]
    .concat([6, 3], new Set('abc'), 'word') 
    // potentially [0, 1, 6, 3, 'a', 'b', 'c', 'w', 'o', 'r', 'd']

// transforming to array
[...iterable] // returns [0, 1, 6, 3, 'a', 'b', 'c', 'w', 'o', 'r', 'd']
// or iterating over values
for (let val of iterable) {
    ...
}
```

### .drop (n = 1)

Creates a new `Iterum` instance that iterates over values of iterable object excluding the first `n` values. `n` is `1` by default.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 5, 2, 6, 3]) // potentially [1, 5, 2, 6, 3]
    .drop(2) // potentially [2, 6, 3]

// transforming to array
[...iterable] // returns [2, 6, 3]
// or iterating over values
for (let val of iterable) {
    ...
}
```

### .dropWhile (predicate, context = this)

Creates a new `Iterum` instance that iterates over values of iterable object excluding the values dropped from the beginning. Elements are excluded until predicate returns falsey.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 5, 3, 8, 3, 5]) // potentially [1, 5, 3, 8, 3, 5]
    .dropWhile(num => num % 2 === 1) // potentially [8, 3, 5]

// transforming to array
[...iterable] // returns [8, 3, 5]
// or iterating over values
for (let val of iterable) {
    ...
}
```

#### `predicate` parameters

##### value
Each value that iterable object produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default it is the iterable object.

### .entries ()

Returns and object that implements the iterable and iterator protocol. This object iterates over pairs `[index, value]` where `value` is the value that produces the iterable object and `index` is the iteration order of `value` starting from `0`.


#### usage:
``` javascript
const Iterum = require('iterum')

const iterator = Iterum('abc') // potentially ['a', 'b', 'c']
    .entries() // potentially [[0, 'a'], [1, 'b'], [2, 'c']]

// transforming to array
[...iterator] // returns [[0, 'a'], [1, 'b'], [2, 'c']]
// or iterating over values
for (let val of iterator) {
    ...
}

// or
iterator.next() // {value: [0, 'a'], done: false}
iterator.next() // {value: [1, 'b'], done: false}
iterator.next() // {value: [2, 'c'], done: false}
iterator.next() // {value: undefined, done: true}
```

### .every (predicate, context = this)

Checks if `predicate` returns truthy for all value of iterable object. Iteration is stopped once predicate returns falsey.

#### usage:
``` javascript
const Iterum = require('iterum')

Iterum.range(0, 3)
    .every(num => num < 5) // true

Iterum.range(0, 3)
    .every(num => num > 0) // false
```

#### `predicate` parameters

##### value
Each value that iterable object produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

### .filter (predicate, context = this)

Creates a new `Iterum` instance that iterates over all values produced by iterable object that `predicate` returns truthy for.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(2, 10) // potentially [2, 3, ... 9, 10]
    .filter(num => num < 5) // potentially [2, 3, 4]

// transforming to array
[...iterable] // returns [2, 3, 4]
// or iterating over values
for (let val of iterable) {
    ...
}
```

#### `predicate` parameters

##### value
Each value that iterable object produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is traversing.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default it is the iterable object.

### .find (predicate, context = this)

Returns the first value of iterable object that `predicate` returns truthy for. 
### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.find(num => num % 4 === 0) // 8
iterable.find(num => num % 4 === 2) // undefined
```

#### `predicate` parameters

##### value
Each value that iterable object produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

### .findEntry (predicate, context = this)

Returns the first entry (pair of index and value) of iterable object that `predicate` returns truthy for.
### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.findEntry(num => num % 4 === 0) // [1, 8]
iterable.findEntry(num => num % 4 === 2) // undefined
```

#### `predicate` parameters

##### value
Each value that iterable object produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

### .findIndex (predicate, context = this)

Returns the first index of iterable object that `predicate` returns truthy for. If `predicate` does not return thuthy, it returns `-1`

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.findIndex(num => num % 4 === 0) // 1
iterable.findIndex(num => num % 4 === 2) // -1
```

#### `predicate` parameters

##### value
Each value that iterable object produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

### .flatten (depth = 1)

Creates a new `Iterum` instance that iterates over values of iterable object flattened with `depth`.


#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([['abc', ['def']], 3]) // potentially [['abc', ['def']], 3]
iterable.flatten(0) // potentially [['abc', ['def']], 3]
iterable.flatten() // potentially ['abc', ['def'], 3]
iterable.flatten(1) // potentially ['abc', ['def'], 3]
iterable.flatten(2) // potentially ['a', 'b', 'c', 'def', 3]
iterable.flatten(3) // potentially ['a', 'b', 'c', 'd', 'e', 'f', 3]
iterable.flatten(Infinity) // potentially ['a', 'b', 'c', 'd', 'e', 'f', 3]
```

### .forEach (cb, context)

Traverses all values calling `cb` with the values of iterable object.

#### usage:
``` javascript
const Iterum = require('iterum')

Iterum([0, 2, 3, 5, 6, 8])
    .forEach(function (num, index) {
        console.log(index + ': ', num)
    })
```

#### `cb` parameters

##### value
Each value that iterable object produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

### .groupBy (cb = e => e)

Returns an `Iterum` instance that iterates over pairs where the second element is an array of grouped values such `cb` callback returns the same value using [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) equality and first element is the value returned by `cb`. The order of grouped values is determined by the order they occur in iterable.

Regardless `groupBy` returns an `Iterum` instance and can be chained with other `Iterum` methods, it is an [eager method](introduction.md#eager-methods) because it requires traversing the whole values of iterable object to know what values are grouped in first value of iterable result.

#### usage
``` javascript
const Iterum = require('iterum')

Iterum([1, 2, 3, 4, 5, 6])
    .groupBy(e => e % 3) // potentially [[1, [1, 4]], [2, [2, 5]], [0, [3, 6]]]

Iterum(['abc', '1.9', '2.5', '2', 'cba'])
    .groupBy(parseInt) // potentially [[NaN, ['abc', 'cba']], [1, ['1.9']], [2, ['2.5', '2']]]
```

### .includes (value, fromIndex = 0)

It behaves like [Array.prototype.includes](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/includes).

#### usage
``` javascript
const Iterum = require('iterum')

Iterum([1, 4, 3, 5, 3])
    .includes(3) // 2

Iterum([1, 4, 3, 5, 3], 2)
    .includes(100) // true

Iterum([1, 4, NaN, 5, 3], 2)
    .indexOf(NaN) // true
```

### .indexOf (value, fromIndex = 0)

It behaves like [Array.prototype.indexOf](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/indexOf).

#### usage:
``` javascript
const Iterum = require('iterum')

Iterum([1, 4, 3, 5, 3])
    .indexOf(3) // 2

Iterum([1, 4, 3, 5, 3], 1)
    .indexOf(100) // -1

Iterum([1, 4, NaN, 5, 3], 1)
    .indexOf(NaN) // -1
```

### .isEqual (iterable)

Returns if iterable object and iterable parameter iterates over the same values in the same order. It always returns `false` if iterables generate different number of values. Values are compared using the [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) algorithm.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([NaN, 0, 2, 3]) // potentially [NaN, 0, 2, 3]

iterable.isEqual(new Set([NaN, -0, 2, 3])) // returns true
iterable.isEqual([NaN, 0, 2, 3, 5]) // returns false
iterable.isEqual([NaN, 0, 5, 3]) // returns false
```

### .isEqualBy (iterable, cb)

Returns if iterable object and iterable parameter iterates over the same values in the same order. It always returns `false` if iterables generate different number of values. Values are compared first transforming each pair of values by `cb` function and then comparing the returned values by [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) algorithm.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum(['abc', '2.3']) // potentially ['abc', '2.3']

iterable.isEqualBy(['cba', '2.1'], parseInt) // returns true
iterable.isEqualBy(['cba'], e => e.length) // returns false
iterable.isEqualBy(['abc', '1.9'], e => e.length) // returns true
iterable.isEqualBy(['abc', '1.9'], parseInt) // returns false
```

### .isEqualWith (iterable, comparator = sameValueZero)

Returns if iterable object and iterable parameter iterates over the same values in the same order. It always returns `false` if iterables generate different number of values. Values are compared applying the `comparator` predicate which is [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) by default.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum(['abc', NaN]) // potentially ['abc', NaN]

iterable.isEqualWith(['cba', 3], (a, b) => typeof a === typeof b) // returns true
iterable.isEqualWith(['abc', NaN]) // returns true (the same as isEqual)
iterable.isEqualWith(['cba', 3]) // returns false (the same as isEqual)
iterable.isEqualWith(['abc', NaN], (a, b) => a === b) // returns false because NaN === NaN is false
```

### .map (cb, context = this)

Creates a new `Iterum` instance that iterates over all values produced by iterable object transformed by `cb` callback.

#### usage:
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

#### `cb` parameters

##### value
Each value that `this` iterable produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `cb` callback. By default is the iterable object.

### .padEnd (length = 0, value = undefined)

Creates a new `Iterum` instance that iterates over the same values as iterable object and if this produces less values than `length`, it keeps returning `value` values until producing `length` values.


#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([3, 2, 8]) // potentially [3, 2, 8]
iterable.padEnd(5, 0) // potentially [3, 2, 8, 0, 0]
iterable.padEnd(7, 1) // potentially [3, 2, 8, 1, 1, 1, 1]
iterable.padEnd(3, 0) // potentially [3, 2, 8]
iterable.padEnd(0, 5) // potentially [3, 2, 8]
iterable.padEnd() // potentially [3, 2, 8]
iterable.padEnd(Infinity, 2) // potentially [3, 2, 8, 2, 2, 2, 2, 2...]
```

### .permutations ()

Creates a new `Iterum` instance that iterates over all permutations that produces the iterable object.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([3, 2, 1]) // potentially [3, 2, 1]
    .permutations() /* potentially [
        [3, 2, 1],
        [2, 3, 1],
        [3, 1, 2],
        [1, 3, 2],
        [2, 1, 3],
        [1, 2, 3]
    ] */
```

### .reduce (cb, initialValue)

`reduce` method applies a `cb` function against an accumulator and each value that produces iterable object (from left-to-right) to reduce it to a single value. `initialValue` can be passed and it will be used as the initial value of accumulator. If initial value is not passed, it takes the first value of iterable as initial value.

#### usage:
``` javascript
const Iterum = require('iterum')

Iterum([5, 2, 1])
    .reduce((a, b) => a - b) // 5 - 2 - 1 === 2
```

#### `cb` parameters

##### accumulator
The value previously returned in the last invocation of the `cb` callback, or `initialValue`, if supplied.

##### value
The current value being processed in the iterable object.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

### .reduceRight (cb, initialValue)

`reduceRight` method applies a function against an accumulator and each value of produces iterable object (from right-to-left) to reduce it to a single value. `initialValue` can be passed and it will be used as the initial value of accumulator. If `initialValue` is not passed, it takes the last value of iterable as initial value.

#### usage:
``` javascript
const Iterum = require('iterum')
const List = Iterum.List

Iterum([5, 2, 1])
    .reduceRight(function (a, b) {
        return a - b
    }) // 1 - 2 - 5 === -6
```

#### `cb` parameters

##### accumulator
The value previously returned in the last invocation of the callback, or initialValue, if supplied.

##### value
The current value being processed in the iterable object.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

### .repeat(n = Infinity)
Creates a new `Iterum` instance that iterates over all values produced by iterable object for `n` times.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([7, 3, 1]) // potentially [7, 3, 1]
const a = iterable.repeat(4) // potentially [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1]
const b = iterable.repeat() // potentially [7, 3, 1, 7, 3, 1, 7, 3, 1, ...]

// transforming to array
[...a] // returns [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1]
// be careful with [...b]! it creates infinite array 
```

### .slice (start = 0, end = Infinity)

Creates a new `Iterum` instance that iterates over all values produced by iterable object between `start` and `end` numbers both included.

#### usage:
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

### .some (predicate, context = this)
Checks if `predicate` returns truthy for any value of iterable object. Iteration is stopped once predicate returns truthy.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(0, 2)

iterable.some(num => num === 1) // true
iterable.some(num => num === 1) // false
```

#### `cb` parameters

##### value
The current value being processed in the iterable object.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterum
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default is the iterable object.

### .take (n = 1)

Creates a new `Iterum` instance that iterates over the `n` first values of the iterable object. `n` is `1` by default.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.range(1, 2000) // potentially [1, 2, ... 2000]
    .take(3) // potentially [1, 2, 3]

// transforming to array
[...iterable] // returns [1, 2, 3]
// or iterating over values
for (let val of iterable) {
    ...
}
```

### .takeWhile (predicate, context = this)

Creates a new `Iterum` instance that iterates over the beginning values of iterable. Elements are taken while predicate returns truthy.

#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum.([2, 5, 8, 10, 9, 8, 7, 6, 5, 4]) // potentially [2, 5, 8, 10, 9, 8, 7, 6, 5, 4]
    .takeWhile(num => num % 3 === 2) // potentially [2, 5, 8]

// transforming to array
[...iterable] // returns [2, 5, 8]
// or iterating over values
for (let val of iterable) {
    ...
}
```

#### `predicate` parameters

##### value
Each value that `this` iterable produces.

##### index
It represents the iteration order of `value`s of iterable object starting from `0`.

##### iterable
The iterable object that is being traversed.

#### context
The object that is referenced by `this` inside the `predicate` callback. By default it is the iterable object.

### .uniq ()

Creates a new `Iterum` instance that iterates over the values without duplications using [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons. The order of iteration values is determined by the order they occur in the iterable object.

``` javascript
const iterable = Iterum([1, NaN, 4, '1', NaN, 3, 1, 4])
    .uniq() // potentially [1, NaN, 4, '1', 3]

for (const val of iterables) {
    // traversing no duplicated values
}
// or transforming to array of no duplicated values
[...iterable] // returns [1, NaN, 4, '1', 3]
```

### .uniqBy (cb = e => e)

Creates a new `Iterum` instance that iterates over the values without duplications using [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) equality comparison over `cb` transformation. For example, `a` and `b` values are equal if `sameValueZero(cb(a), cb(b))` returns `true`. The order of iteration values is determined by the order they occur in the iterable object.

``` javascript
const iterable = Iterum(['abc', '2.1', '3', '2.4', 'cba'])
    .uniqBy(parseInt) // potentially ['abc', '2.1', '3']

for (const val of iterables) {
    // traversing no duplicated values
}
// or transforming to array of no duplicated values
[...iterable] // returns ['abc', '2.1', '3']
```

### .uniqWith (cmp = sameValueZero)

Creates a new `Iterum` instance that iterates over the values without duplications using `cmp` binary predicate for equality comparisons. `cmp` is [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) by default. The order of iteration values is determined by the order they occur in the iterable object.

``` javascript
const cmpPairDiff = (a, b) => a[0] - a[1] === b[0] - b[1]

const iterable = Iterum([[5, 2], [2, 0], [2, 3], [-2, -1], [3, 0], [1, 4]])
    .uniqWith(cmpPairDiff) // potentially [[5, 2], [2, 0], [2, 3], [1, 4]]

for (const val of iterables) {
    // traversing no duplicated values
}
// or transforming to array of no duplicated values
[...iterable] // returns [[5, 2], [2, 0], [2, 3], [1, 4]]
```

### .zip (...iterables)

Creates a new `Iterum` instance that iterates over iterable values grouped by tuples, the first of which contains the first elements of the given `iterables`, the second of which contains the second elements of the given `iterables`, and so on.


#### usage:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([3, 2, 8]) // potentially [3, 2, 8]
iterable.zip([4, 5, 6]) // potentially [[3, 4], [2, 5], [8, 6]]
iterable.zip([4, 5, 6], 'abc') // potentially [[3, 4, 'a'], [2, 5, 'b'], [8, 6, 'c']]
iterable.zip([10, 0]) // potentially [[3, 10], [2, 0]]
iterable.zip() // potentially [[3], [2], [8]]
```

## Static methods

`Iterum` provides static methods for each object method. The behaviour of an static method is related to the object method with the same name. For each object method named `<method>` there is an `Iterum.<method>(iterable, ...args)` that behaves equal than `Iterum(iterable).<method>(...args)`. Also there are some static methods like [range](#iterumrangestart--0-end--infinity-step--1) that are not related with any object method.

### Iterum.cartesian (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).cartesian(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).cartesian(iterables)`.

See [cartesian method](#cartesian-iterables)

### Iterum.concat (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).concat(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).concat(iterables)`.

See [concat method](#concat-iterables)

### Iterum.drop (iterable, n = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).drop(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).drop(n)`.

See [drop method](#drop-n--1)

### Iterum.dropWhile (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).drop(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).drop(predicate, context)`.

See [dropWhile method](#dropwhile-predicate-context--this)

### Iterum.entries (iterable)

- If `iterable` is iterable, it behaves like `Iterum(iterable).entries()`.
- If `iterable` is not iterable, it behaves like `Iterum([]).entries()`.

See [entries method](#entries-)

### Iterum.every (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).every(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).every(predicate, context)`.

See [every method](#every-predicate-context--this)

### Iterum.filter (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).filter(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(predicate, context)`.

See [filter method](#filter-predicate-context--this)

### Iterum.find (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).find(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).find(predicate, context)`.

See [find method](#find-predicate-context--this)

### Iterum.findEntry (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).findEntry(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).findEntry(predicate, context)`.

See [findEntry method](#findentry-predicate-context--this)

### Iterum.findIndex (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).findIndex(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).findIndex(predicate, context)`.

See [findIndex method](#findindex-predicate-context--this)

### Iterum.flatten (iterable, depth = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).flatten(depth)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(depth)`.

See [flatten method](#flatten-depth--1)

### Iterum.forEach (iterable, cb, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).forEach(cb, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).forEach(cb, context)`.

See [forEach method](#foreach-cb-context)

### Iterum.groupBy (iterable, cb = e => e)

- If `iterable` is iterable, it behaves like `Iterum(iterable).groupBy(cb)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).forEach(cb)`.

See [groupBy method](#groupby-cb--e--e)

### Iterum.includes (iterable, value, fromIndex = 0)

- If `iterable` is iterable, it behaves like `Iterum(iterable).includes(value, fromIndex)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).includes(value, fromIndex)`.

See [includes method](#includes-value-fromindex--0)

### Iterum.indexOf (iterable, value, fromIndex = 0)

- If `iterable` is iterable, it behaves like `Iterum(iterable).indexOf(value, fromIndex)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).indexOf(value, fromIndex)`.

See [indexOf method](#indexof-value-fromindex--0)

### Iterum.isEqual (iterable1, iterable2)

- If `iterable1` is iterable, it behaves like `Iterum(iterable1).isEqual(iterable2)`.
- If `iterable1` is not iterable, it behaves like `Iterum([]).isEqual(iterable2)`.

See [isEqual method](#isequal-iterable)

### Iterum.isEqualBy (iterable1, iterable2, cb)

- If `iterable1` is iterable, it behaves like `Iterum(iterable1).isEqualBy(iterable2, cb)`.
- If `iterable1` is not iterable, it behaves like `Iterum([]).isEqualBy(iterable2, cb)`.

See [isEqualBy method](#isequalby-iterable-cb)

### Iterum.isEqualWith (iterable1, iterable2, comparator = sameValueZero)

- If `iterable1` is iterable, it behaves like `Iterum(iterable1).isEqualWith(iterable2, comparator)`.
- If `iterable1` is not iterable, it behaves like `Iterum([]).isEqualWith(iterable2, comparator)`.

See [isEqualWith method](#isequalwith-iterable-comparator--samevaluezero)

### Iterum.map (iterable, cb, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).map(cb, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).map(cb, context)`.

See [map method](#map-cb-context--this)

### Iterum.padEnd (iterable, length = 0, value = undefined)

- If `iterable` is iterable, it behaves like `Iterum(iterable).padEnd(length, value)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).padEnd(length, value)`.

See [padEnd method](#padend-length--0-value--undefined)

### Iterum.permutations (iterable)

- If `iterable` is iterable, it behaves like `Iterum(iterable).permutations()`.
- If `iterable` is not iterable, it behaves like `Iterum([]).permutations()`.

See [permutations method](#permutations-)

### Iterum.range(start = 0, end = Infinity, step = 1)

Creates an Iterum instance that iterates over values between `start` and `end` value both included with an `step`.

#### Usage:
``` javascript
const {range} = require('iterum')

range(2, 7) // potentially [2, 3, 4, 5, 6, 7]
range(0, 25, 5) // potentially [5, 10, 15, 20, 25]
range(4, 10, 4) // potentially [4, 8]
range(1) // potentially [1, 2, 3, 4, ...]
```

### Iterum.reduce (iterable, callback, initialValue)

- If `iterable` is iterable, it behaves like `Iterum(iterable).reduce(callback, initialValue)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).reduce(callback, initialValue)`.

See [reduce method](#reduce-cb-initialvalue)

### Iterum.reduceRight (iterable, callback, initialValue)

- If `iterable` is iterable, it behaves like `Iterum(iterable).reduceRight(callback, initialValue)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).reduceRight(callback, initialValue)`.

See [reduceRight method](#reduceright-cb-initialvalue)

### Iterum.repeat(iterable, n = Infinity)

- If `iterable` is iterable, it behaves like `Iterum(iterable).repeat(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).repeat(n)`.

See [repeat method](#repeatn--infinity)

### Iterum.slice (iterable, start = 0, end = Infinity)

- If `iterable` is iterable, it behaves like `Iterum(iterable).slice(start, end)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).slice(start, end)`.

See [slice method](#slice-start--0-end--infinity)

### Iterum.some (iterable, callback, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).some(callback, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).some(callback, context)`.

See [some method](#some-predicate-context--this)

### Iterum.take (iterable, n = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).take(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).take(n)`.

See [take method](#take-n--1)

### Iterum.takeWhile (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).takeWhile(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).takeWhile(predicate, context)`.

See [takeWhile method](#takewhile-predicate-context--this)

### Iterum.uniq (iterable)

- If `iterable` is iterable, it behaves like `Iterum(iterable).uniq()`.
- If `iterable` is not iterable, it behaves like `Iterum([]).uniq()`.

See [uniq method](#uniq-)

### Iterum.uniqBy (iterable, cb = e => e)

- If `iterable` is iterable, it behaves like `Iterum(iterable).uniqBy()`.
- If `iterable` is not iterable, it behaves like `Iterum([]).uniqBy()`.

See [uniqBy method](#uniqby-cb--e--e)

### Iterum.uniqWith (iterable, predicate = sameValueZero)

- If `iterable` is iterable, it behaves like `Iterum(iterable).uniqWith(predicate)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).uniqWith(predicate)`.

See [uniqWith method](#uniqwith-cmp--samevaluezero)

### Iterum.zip (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).zip(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).zip(iterables)`.

See [zip method](#zip-iterables)
