# Introduction

## Type signature notation

The signature of functions and methods follows an extension of [fantasy land notation](https://github.com/fantasyland/fantasy-land/blob/master/README.md#type-signature-notation).
In addition,
- `[a]` represents an iterable that generates values according to `a` type.
- `@[a]` represents an iterable that generates values according to `a` type and it is an instance of `Iterum` class.
- `@(a, b)` represents an iterable of two values `a` and `b` with their respective types and it is an instance of `Iterum` class.

## Iterum example notation

The Iterum iterables are represented by Lisp notation to avoid confusion with javascript objects or arrays. Then, an iterable that iterates over 1, 2, and 3 it is represented thus:

```
Iterum([1, 2, 3]) // returns (1 2 3)
```

If the iterable represented is potentially infinite, the ellipsis is used. For example:

```
// positive numbers
Iterum.range(1, Infinity) // (1 2 3 4...)
```


## Two ways of building iterables

This library provides autocurryed function style and method chaining style to build iterables. For example, using functions:

``` javascript

const {map, filter, take} = require('iterum')
const filterOdd = filter(num % 2 === 1)
const mapDouble = map(num => 2 * num)
const takeThree = take(3)

takeThree(mapDouble(filterOdd([1, 2, 3, 4, 5, 6, 7]))) // (2 6 10)
```

or using methods:
``` JavaScript
const Iterum = require('iterum')
Iterum([1, 2, 3, 4, 5, 6, 7])
    .filter(num % 2 === 1)
    .map(num => 2 * num)
    .take(3) // (2 6 10)
```

# API

## constructor
### `constructor :: [a] -> @[a]`

It builds a new Iterum object that behaves as the same way as iterable `[a]` parameter and is decorated with all of methods that provides Iterum prototype class.

If constructor does not follow the signature specified below, it throws a `TypeError`.

Constructor can be called using `new` or not.

#### Example:

``` javascript
const Iterum = require('iterum')

const array = [1, 2, 3]
const a = Iterum(array) // (1 2 3)
// or with new
const b = new Iterum(array) // (1 2 3)

// spread operator produces the same array regardless how the object is created:
;[...a] // [1, 2, 3]
;[...b] // [1, 2, 3]
;[...array] // [1, 2, 3]

// and Iterum object behaves equal using for..of
let index = 0
for (let val of a) {
    // always vak === array[index]
    ++index
}

// and constructor can be used with the whole iterable types:
const stringIterable = Iterum('abc')
const typedArrayIterable = Iterum(Uint8Array([127, 0, 0, 1]))
const setIterable = Iterum(new Set().add(2).add(5).add(6))
```

## combinations

Given an iterable and a number `n`, it returns an iterable of iterables that represents the [combinations](https://en.wikipedia.org/wiki/Combination) of the iterable values over `n`.

If `combinations` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `combinations :: @[a] ~> Number -> @[@[a]]`

#### Example:

``` javascript
const Iterum = require('iterum')

Iterum([1, 2, 3, 4]).combinations(2) /* (
    (1 2)
    (1 3)
    (2 3)
    (1 4)
    (2 4)
    (3 4)
) */

Iterum([1, 2, 3, 4]).combinations([]) // throws a TypeError
```

### `combinations :: Number -> [a] -> @[@[a]]`

#### Example:

``` javascript
const {combinations} = require('iterum')

combinations(2, [1, 2, 3, 4]) /* (
    (1 2)
    (1 3)
    (2 3)
    (1 4)
    (2 4)
    (3 4)
) */

combinations([], [1, 2, 3, 4]) // throws a TypeError
combinations(2, {one: 1, two: 2, three: 3}) // throws a TypeError

```

## concat

Given two iterables, it returns an iterable that is the concatenation of first iterable with second iterable.

If `concat` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `concat :: @[a] ~> [a] -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {range} = Iterum

Iterum([0, 0, 0])
    .concat(range(1, Infinity)) // (0 0 0 1 2 3 4...)
Iterum([1, 2, 3])
    .concat('abcd') // (1 2 3 'a' 'b' 'c' 'd')
Iterum([1, 2, 3])
    .concat(4) // throws TypeError
```

### `concat :: [a] -> [a] -> @[a]`

#### Example:
``` javascript
const {concat, range} = require('iterum')

concat([0, 0, 0], range(1, Infinity)) // (0 0 0 1 2 3 4...)
concat([1, 2, 3], 'abcd') // (1 2 3 'a' 'b' 'c' 'd')
concat([1, 2, 3], 4) // throws TypeError
```

## drop

Given an iterable and a number `n`, it returns a new iterable excluding the first `n` values of the given iterable.

If `drop` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `drop :: @[a] ~> Number -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {rangeByStep} = Iterum

Iterum([1, 5, 2, 6, 3])
    .drop(2) // (2 6 3)
Iterum(rangeByStep(0, Infinity, 2))
    .drop(4) // (8 10 12 14 16...)
Iterum([1, 2, 3])
    .drop(true) // throws TypeError
```

### `drop :: Number -> [a] -> @[a]`

#### Example:
``` javascript
const {drop, rangeByStep} = require('iterum')

drop(2, [1, 5, 2, 6, 3]) // (2 6 3)
drop(4, rangeByStep(0, Infinity, 2)) // (8 10 12 14 16...)
drop({}, [1, 2, 3]) // throws a TypeError
drop(2, {name: 'John'}) // throws a TypeError

```

## dropWhile

Given a predicate and `iterable, it returns a new iterable that excludes first values that matches to predicate.

If `dropWhile` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `dropWhile :: @[a] ~> (a -> Boolean) -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {rangeByStep} = Iterum
const isOdd = num => num % 2 === 1

Iterum([1, 5, 3, 8, 3, 5])
    .dropWhile(isOdd) // (8 3 5)
Iterum(rangeByStep(0, Infinity, 2))
    .dropWhile(isOdd) (0 2 4 6 8...)
Iterum([1, 5, 3, 8, 3, 5])
    .dropWhile(null) // throws a `TypeError`
```

### `dropWhile :: (a -> Boolean) -> [a] -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {rangeByStep} = Iterum
const isOdd = num => num % 2 === 1

Iterum([1, 5, 3, 8, 3, 5])
    .dropWhile(isOdd) // (8 3 5)
Iterum(rangeByStep(0, Infinity, 2))
    .dropWhile(isOdd) (0 2 4 6 8...)
Iterum([1, 5, 3, 8, 3, 5])
    .dropWhile(null) // throws a `TypeError`
```

## entries

Given iterable parameter, it returns a new iterable that iterates over pairs `[index, value]` where `value` is the value that produces the iterable parameter and `index` is the iteration order of `value` starting from `0`.

### `entries :: @[a] ~> @[@(Number, a)]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum('abc')
    .entries() // ((0 'a') (1 'b') (2 'c'))
Iterum(new Set(['foo', 'bar', 'fizz', 'buzz']))
    .entries() // ((0 'foo') (1 'bar') (2 'fizz') (3 'buzz'))

```

### `entries :: [a] -> @[@(Number, a)]`

#### Example:
``` javascript
const {entries} = require('iterum')

entries('abc') // ((0 'a') (1 'b') (2 'c'))
entries(new Set(['foo', 'bar', 'fizz', 'buzz']) // ((0 'foo') (1 'bar') (2 'fizz') (3 'buzz'))

```

## every

Given iterable, it checks if `predicate` returns truthy for all of values that produces the iterable. Iteration is stopped once predicate returns falsey.

If `every` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `every :: @[a] ~> (a -> Boolean) -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([1, 2, 3])
    .every(num => num < 5) // true
Iterum([1, 2, 3])
    .every(num => num > 0) // false
Iterum([1, 2, 3])
    .every([4, 5, 6]) // throws a TypeError
```

### `every :: (a -> Boolean) -> [a] -> Boolean`

#### Example:
``` javascript
const {every} = require('iterum')

every(num => num < 5, [1, 2, 3]) // true
every(num => num > 0, [1, 2, 3]) // false
every([4, 5, 6], [1, 2, 3]) // throws a TypeError
every([4, 5, 6], true) // throws a TypeError

```

## filter

Given an iterable, it returns a new iterable that iterares over all values produced by first iterable that `predicate` returns truthy for.

If `filter` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `filter :: @[a] ~> (a -> Boolean) -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {range} = Iterum

Iterum([1, 7, 2, 9, 8, 2, 4])
    .filter(num => num < 5) // (1 2 2 4)
range(0, Infinity)
    .filter(num => num % 2 === 0) // (0 2 4 6 8...)
```

## find

Given an iterable and a predicate, it returns the first value of the iterable that `predicate` returns truthy for. If predicate does not return `true` for any value, it returns `undefined`

If `find` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `find :: @[a] ~> (a -> Boolean) -> a`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4]) // (1 8 3 4)

iterable.find(num => num % 4 === 0) // 8
iterable.find(num => num % 4 === 2) // undefined
iterable.find(3) // throws a TypeError
```

### `find (a -> Boolean) -> [a] -> a`

#### Example:
``` javascript
const {find} = require('iterum')

const iterable = [1, 8, 3, 4]

find(num => num % 4 === 0, iterable) // 8
find(num => num % 4 === 2, iterable) // undefined
find(3, iterable) // throws a TypeError
find(num => num % 4 === 2, 4) // throws a TypeError
```

## findEntry

Given an iterable and a predicate, it returns the first entry of the iterable that `predicate` returns truthy for. An entry is the same pair of index and value that produces [entries]() function. If predicate does not return `true` for any value, it returns `undefined`

If `findEntry` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `findEntry :: @[a] ~> (a -> Boolean) -> @(Number, a)`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.findEntry(num => num % 4 === 0) // [1, 8]
iterable.findEntry(num => num % 4 === 2) // undefined
iterable.findEntry(3) // throws a TypeError
```

### `findEntry :: @[a] ~> (a -> Boolean) -> @(Number, a)`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.findEntry(num => num % 4 === 0) // (1 8)
iterable.findEntry(num => num % 4 === 2) // undefined
iterable.findEntry(3) // throws a TypeError
```

### `findEntry :: (a -> Boolean) -> @[a] -> @(Number, a)`

#### Example:
``` javascript
const {findEntry} = require('iterum')

const iterable = [1, 8, 3, 4]

findEntry(num => num % 4 === 0, iterable) // (1 8)
findEntry(num => num % 4 === 2, iterable) // undefined
findEntry(3, iterable) // throws a TypeError
findEntry(num => num % 4 === 0, 4) // throws a TypeError
```

## findIndex

Given an iterable and a predicate, it returns the first index of iterable that predicate returns truthy for. If predicate does not return thuthy fro any value, it returns `-1`.

If `findIndex` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `findIndex :: @[a] ~> (a -> Boolean) -> Number`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

iterable.findIndex(num => num % 4 === 0) // 1
iterable.findIndex(num => num % 4 === 2) // -1
iterable.findIndex(3) // throws a TypeError
```

### `findIndex :: (a -> Boolean) -> [a] -> Number`

#### Example:
``` javascript
const {findIndex} = require('iterum')

const iterable = Iterum([1, 8, 3, 4])

findIndex(num => num % 4 === 0, iterable) // 1
findIndex(num => num % 4 === 2, iterable) // -1
findIndex(3, iterable) // throws a TypeError
findIndex(num => num % 4 === 2, true) // throws a TypeError
```

## flatten

Given an iterable and a depth, it returns an iterable that iterates over values of iterable object flattened until this depth.

If `flatten` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `flatten :: @[a] ~> Number -> @[b]`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([['abc', ['def']], 3]) // (['abc', ['def']] 3)
iterable.flatten(0) // (['abc', ['def']] 3)
iterable.flatten(1) // ('abc' ['def'] 3)
iterable.flatten(2) // ('a' 'b' 'c' 'def' 3)
iterable.flatten(3) // ('a' 'b' 'c' 'd' 'e' 'f' 3)
iterable.flatten(Infinity) // ('a' 'b' 'c' 'd' 'e' 'f' 3)
iterable.flatten('abc') // throws a TypeError

```

### `flatten :: Number -> [a] -> @[b]`

#### Example:
``` javascript
const {flatten} = require('iterum')

const iterable = [['abc', ['def']], 3]
flatten(0, iterable) // (['abc', ['def']] 3)
flatten(1, iterable) // ('abc' ['def'] 3)
flatten(2, iterable) // ('a' 'b' 'c' 'def' 3)
flatten(3, iterable) // ('a' 'b' 'c' 'd' 'e' 'f' 3)
flatten(Infinity, iterable) // ('a' 'b' 'c' 'd' 'e' 'f' 3)
flatten('abc', iterable) // throws a TypeError
flatten(1, {fizz: 'buzz', foo: 'bar'}) // throws a TypeError
```

## groupBy

Given an iterable and a function, it returns an iterable that iterates over groups of values such `cb` callback returns the same value. The order of grouped values is determined by the order they occur in iterable.
Two values of given iterable are in the same group if [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)(`cb(a), cb(b)`) returns `true`.

If `groupBy` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `groupBy :: @[a] ~> (a -> b) -> @[@[a]]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([1, 2, 3, 4, 5, 6, 7])
    .groupBy(e => e % 3) // ((1 4 7) (2 5) (3 6))
Iterum(['abc', '1.9', '2.5', '2', 'cba'])
    .groupBy(parseInt) // (('abc' 'cba') ('1.9') ('2.5' '2'))
```

### `groupBy :: (a -> b) -> [a] -> @[@[a]]`

#### Example:
``` javascript
const {groupBy} = require('iterum')

groupBy(e => e % 3, [1, 2, 3, 4, 5, 6, 7]) // ((1 4 7) (2 5) (3 6))
groupBy(parseInt, ['abc', '1.9', '2.5', '2', 'cba']) // (('abc' 'cba') ('1.9') ('2.5' '2'))
```

## has

Given an iterable and a number `n`, it returns true or false if iterable generates a `n`-th value or not.

If `has` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `has :: @[a] ~> Number -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')
const {range} = Iterum

Iterum([7, 6, 5])
    .has(2) // true
Iterum([7, 6, 5])
    .has(3) // false
range(-5, Infinity)
    .has(10000) // true
range(-5, Infinity)
    .has(-1) // false
Iterum([1, 2, 3])
    .has('a') // throws TypeError
```

### `has :: Number -> [a] -> Boolean`

#### Example:
``` javascript
const {has, range} = require('iterum')

has(2, [7, 6, 5]) // true
has(3, [7, 6, 5]) // false
has(10000, range(-5, Infinity)) // true
has(-1, range(-5, Infinity)) // false
has('a', [1, 2, 3]) // throws TypeError
```

## includes

Given an iterable and a value, it returns true if iterable iterates over this value. Values are compared using the [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) specification.

If `includes` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `includes :: @[a] ~> a -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([1, 4, 3, 5, 3])
    .includes(3) // true
Iterum([1, 4, 3, 5, 3])
    .includes(100) // false
Iterum([1, 4, NaN, 5, 3])
    .includes(NaN) // true
```

### `includes :: a -> [a] -> Boolean`

#### Example:
``` javascript
const {includes} = require('iterum')

includes(3, [1, 4, 3, 5, 3]) // true
includes(100, [1, 4, 3, 5, 3]) // false
includes(NaN, [1, 4, NaN, 5, 3]) // true
includes(3, /a+/) // throw a TypeError
```

## indexOf

Given an iterable and a value, it returns a number that means the position of first value that is equal to `val` in iterable iteration. If iterable does not iterates over this value, it returns `-1`. Values are compared using the [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) specification.

If `indexOf` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `indexOf :: @[a] ~> a -> Number`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([1, 4, 3, 5, 3])
    .indexOf(3) // 2
Iterum([1, 4, 3, 5, 3])
    .indexOf(100) // -1
Iterum([1, 4, NaN, 5, 3])
    .indexOf(NaN) // 2
```

### `indexOf :: a -> [a] -> Number`

#### Example:
``` javascript
const {indexOf} = require('iterum')

indexOf(3, [1, 4, 3, 5, 3]) // 2
indexOf(100, [1, 4, 3, 5, 3]) // -1
indexOf(NaN, [1, 4, NaN, 5, 3]) // 2
indexOf(2, {a: 1, b: 2}) // throws a TypeError
```

## indexOfFrom

Given an iterable, a value `val` and a number `n`, it returns a number that means the position of first value that is equal to `val` in iterable iteration starting to search from `n`-th value. If iterable does not iterates over this value, it returns `-1`. Values are compared using the [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) specification.

If `indexOfFrom` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `indexOfFrom :: @[a] ~> (a, Number) -> Number`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([1, 3, 4, 5, 3])
    .indexOfFrom(3, 2) // 4
Iterum('aaabbbbb')
    .indexOfFrom('a', 3) // -1
Iterum([1, NaN, 2, NaN, 3])
    .indexOfFrom(NaN, 2) // 3
Iterum([1, NaN, 2, NaN, 3])
    .indexOfFrom(NaN, []) // throws a TypeError
```

### `indexOfFrom :: a -> Number -> [a] -> Number`

#### Example:
``` javascript
const {indexOfFrom} = require('iterum')

indexOfFrom(3, 2, [1, 3, 4, 5, 3]) // 2
indexOfFrom('a', 3, 'aaabbbbb') // -1
indexOfFrom(NaN, 2, [1, NaN, 2, NaN, 3]) // 3
indexOfFrom(NaN, [], [1, NaN, 2, NaN, 3]) // throws a TypeError
indexOfFrom(2, 1, {a: 1, b: 2}) // throws a TypeError
```

## isEqual

Returns true if iterables are equivalent and false otherwise. Equality of iterables is determined value by value using [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) specification for comparation. If iterables do not generate the same number of values, it returns `false`.

If `isEqual` method or function does not follow the signatures specified below, it returns `false`.

### `isEqual :: @[a] ~> [a] -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([NaN, 0, 2, 3])

iterable.isEqual(new Set([NaN, -0, 2, 3])) // true
iterable.isEqual([NaN, 0, 2, 3, 5]) // false
iterable.isEqual([NaN, 0, 5, 3]) // false
iterable.isEqual(3) // false
```

### `isEqual :: [a] -> [a] -> Boolean`

#### Example:
``` javascript
const {isEqual} = require('iterum')

const iterable = [NaN, 0, 2, 3]

isEqual(iterable, new Set([NaN, -0, 2, 3])) // true
isEqual(iterable, [NaN, 0, 2, 3, 5]) // false
isEqual(iterable, [NaN, 0, 5, 3]) // false
isEqual(3, 3) // false
isEqual(2, null) // false
```

## isEqualBy

Given an iterable and callback `cb`, it returns true if iterables are equivalent and false otherwise. Equality of iterables is determined value by value using `(a, b) => `[sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)`(cb(a), cb(b))` comparation. If iterables do not generate the same number of values, it returns `false`.

If `isEqualBy` method or function does not follow the signatures specified below, it returns `false`.

### `isEqual :: @[a] ~> (a -> b, [a]) -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum(['abc', '2.3'])

iterable.isEqualBy(parseInt, ['cba', '2.1']) // true
iterable.isEqualBy(e => e.length, ['cba']) // false
iterable.isEqualBy(e => e.length, ['abc', '1.9']) // true
iterable.isEqualBy(parseInt, ['abc', '1.9']) // false
```

### `isEqual :: (a -> b) -> [a] -> [a] -> Boolean`

#### Example:
``` javascript
const {isEqualBy} = require('iterum')

const iterable = Iterum(['abc', '2.3'])

isEqualBy(parseInt, iterable, ['cba', '2.1']) // true
isEqualBy(e => e.length, iterable, ['cba']) // false
isEqualBy(e => e.length, iterable, ['abc', '1.9']) // true
isEqualBy(parseInt, iterable, ['abc', '1.9']) // false
```

## isEqualWith

Given an iterable and binary predicate, it returns true if iterables are equivalent and false otherwise. Equality of iterables is determined value by value using the predicate comparation. If iterables do not generate the same number of values, it returns `false`.

If `isEqualWith` method or function does not follow the signatures specified below, it returns `false`.

### `isEqualWith :: @[a] ~> ((a -> Boolean), [a]) -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum(['abc', NaN])

iterable.isEqualWith((a, b) => typeof a === typeof b, ['cba', 3]) // true
iterable.isEqualWith((a, b) => a === b, ['abc', NaN]) // false
```

### `isEqualWith :: (a -> Boolean) -> [a] -> [a] -> Boolean`

#### Example:
``` javascript
const {isEqualWith} = require('iterum')

const iterable = Iterum(['abc', NaN])

isEqualWith((a, b) => typeof a === typeof b, iterable, ['cba', 3]) // true
isEqualWith((a, b) => a === b, iterable, ['abc', NaN]) // false
```

## map

Given an iterable and a callback, it returns a new iterablethat iterates over all values produced by iterable object transformed by callback.

If `map` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `map :: @[a] ~> (a -> b) -> @[b]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {range} = Iterum

Iterum([7, 3, 1, 4])
    .map(num => 3 * num) // (21 9 3 12)
range(0, Infinity)
    .map(num => 2 * num) // (0 2 4 6 8...)
Iterum([7, 3, 1, 4])
    .map(8) // throws a TypeError
```

### `map :: (a -> b) -> [a] -> @[b]`

#### Example:
``` javascript
const {map, range} = require('iterum')

map(num => 3 * num, [7, 3, 1, 4]) // (21 9 3 12)
map(num => 2 * num, range(0, Infinity)) // (0 2 4 6 8...)
map(8, [7, 3, 1, 4]) // throws a TypeError
map(num => 3 * num, 8) // throws a TypeError
```

## nth

Given an iterable and a number `n`, it returns the `n`-th value that generates the iterable. If `n`-th value does not exist it returns `undefined`

If `nth` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `nth :: @[a] ~> Number -> (a | undefined)`

#### Example:
``` javascript
const Iterum = require('iterum')
const {range} = Iterum

Iterum([7, 6, 5])
    .nth(2) // 5
Iterum([7, 6, 5])
    .nth(3) // undefined
range(-5, Infinity)
    .nth(10000) // true
range(-5, Infinity)
    .nth(-1) // false
Iterum([1, 2, 3])
    .nth('a') // throws TypeError
```

### `nth :: Number -> [a] -> (a | undefined)`

#### Example:
``` javascript
const {nth, range} = require('iterum')

nth(2, [7, 6, 5]) // true
nth(3, [7, 6, 5]) // false
nth(10000, range(-5, Infinity)) // true
nth(-1, range(-5, Infinity)) // false
nth('a', [1, 2, 3]) // throws TypeError
```

## padEnd (length = 0, value = undefined)

Given an iterable, a number `length` and a `value`, it returns a new iterable that iterates over the same values as iterable and if this generates less values than `length`, it keeps generating `value` values until generating `length` values.

If `padEnd` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `padEnd :: @[a] ~> @(Number, a) -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([3, 2, 8]) // (3 2 8)
iterable.padEnd(5, 0) // (3 2 8 0 0)
iterable.padEnd(7, 1) // (3 2 8 1 1 1 1)
iterable.padEnd(3, 0) // (3 2 8)
iterable.padEnd(0, 5) // (3 2 8)
iterable.padEnd(Infinity, 2) // (3 2 8 2 2 2 2...)
```

### `padEnd :: Number -> a -> [a] -> @[a]`

#### Example:
``` javascript
const {padEnd} = require('iterum')

const iterable = [3, 2, 8]
padEnd(5, 0, iterable) // (3 2 8 0 0)
padEnd(7, 1, iterable) // (3 2 8 1 1 1 1)
padEnd(3, 0, iterable) // (3 2 8)
padEnd(0, 5, iterable) // (3 2 8)
padEnd(Infinity, 2, iterable) // (3 2 8 2 2 2 2...)
```

## permutations

Given an iterable, it returns a new iterable that iterates over all its permutations.

If `permutations` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `permutations :: @[a] -> @[@[a]]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([3, 2, 1])
    .permutations() /* (
        (3 2 1)
        (2 3 1)
        (3 1 2)
        (1 3 2)
        (2 1 3)
        (1 2 3)
    ] */
```

### `permutations :: @[a] -> @[@[a]]`

#### Example:
``` javascript
const {permutations} = require('iterum')

permutations([3, 2, 1]) /* (
    (3 2 1)
    (2 3 1)
    (3 1 2)
    (1 3 2)
    (2 1 3)
    (1 2 3)
] */
```

## power

Given an iterable and a number, it returns the cartesian power of these iterables.

If `power` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `power :: @[a] ~> Number -> @[@[a]]`

#### Example:
``` javascript
const Iterum = require('iterum')

// the same as Iterum([[0, 1, 2], [0, 1, 2]]).product()
Iterum([0, 1, 2]).power(2) /* (
    (0 0)
    (1 0)
    (2 0)
    (0 1)
    (1 1)
    (2 1)
    (0 2)
    (1 2)
    (2 2)
) */
// the same as Iterum([[0, 1], [0, 1], [0, 1]]).product()
Iterum([0, 1]).power(3) /* (
    (0 0 0)
    (1 0 0)
    (0 1 0)
    (1 1 0)
    (0 0 1)
    (1 0 1)
    (0 1 1)
    (1 1 1)
) */
// infinity power
Iterum([0, 1]).power(Infinity) /* (
    (0 0 0...)
    (1 0 0...)
    (0 1 0...)
    (1 1 0...)
    (0 0 1...)
    .
    .
    .
) */
```

### `power :: Number -> [a] -> @[[a]]`

#### Example:
``` javascript
const {power} = require('iterum')

// the same as product([[0, 1, 2], [0, 1, 2]])
power(2, [0, 1, 2]) /* (
    (0 0)
    (1 0)
    (2 0)
    (0 1)
    (1 1)
    (2 1)
    (0 2)
    (1 2)
    (2 2)
) */
// the same as product([[0, 1], [0, 1], [0, 1]])
power(3, [0, 1]) /* (
    (0 0 0)
    (1 0 0)
    (0 1 0)
    (1 1 0)
    (0 0 1)
    (1 0 1)
    (0 1 1)
    (1 1 1)
) */
// infinity power
power(Infinity, [0, 1]) /* (
    (0 0 0...)
    (1 0 0...)
    (0 1 0...)
    (1 1 0...)
    (0 0 1...)
    .
    .
    .
) */
```

## powerSet

Given an iterable, it returns the [power set](https://en.wikipedia.org/wiki/Power_set) of these iterable.

If `powerSet` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `powerSet :: @[a] ~> @[@[a]]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([5, 2]).powerSet() /* (
    ()
    (5)
    (2)
    (5 2)
) */
Iterum([1, 2, 3]).powerSet() /* (
    ()
    (1)
    (2)
    (3)
    (1 2)
    (1 3)
    (2 3)
    (1 2 3)
) */
```

### `powerSet :: [a] -> @[[a]]`

#### Example:
``` javascript
const {powerSet} = require('iterum')

powerSet([5, 2]) /* (
    ()
    (5)
    (2)
    (5 2)
) */
powerSet([1, 2, 3]) /* (
    ()
    (1)
    (2)
    (3)
    (1 2)
    (1 3)
    (2 3)
    (1 2 3)
) */
```

## product

Given an iterable of iterables, it returns the cartesian product of these iterables.

If `product` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `product :: @[@[a]] ~> @[@[a]]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([
    [6, 3],
    'abc',
    [1]
]).product() /* (
    (6 'a' 1)
    (6 'b' 1)
    (6 'c' 1)
    (3 'a' 1)
    (3 'b' 1)
    (3 'c' 1)
) */
```

### `product :: [[a]] -> @[[a]]`

#### Example:
``` javascript
const {product} = require('iterum')

product([
    [6, 3],
    'abc',
    [1]
]) /* (
    (6 'a' 1)
    (6 'b' 1)
    (6 'c' 1)
    (3 'a' 1)
    (3 'b' 1)
    (3 'c' 1)
) */
```

## range

Given `start` number and `end` number, it returns an iterable that iterates over values between start and end values both included with an step 1.

If `range` method or function does not follow the signature specified below, it throws a `TypeError`.

### `range :: Number -> Number -> @[a]`

#### Example:
``` javascript
const {range} = require('iterum')

range(2, 7) // (2 3 4 5 6 7)
range(-5, 0) // (-5 -4 -3 -2 -1 0)
range(5, 0) // ()
range(1, Infinity) // (1 2 3 4 5...)
```

## rangeByStep

Given `start` number, `end` number and `step` number, it returns an iterable that iterates over values between start and end values both included with an `step`.

If `rangeByStep` method or function does not follow the signature specified below, it throws a `TypeError`.

### `rangeByStep :: Number -> Number -> @[a]`

#### Example:
``` javascript
const {rangeByStep} = require('iterum')

rangeByStep(2, 12, 3) // (2 5 8 11)
rangeByStep(5, 1, -1) // (5 4 3 2 1)
rangeByStep(1, Infinity, 2) // (1 3 5 7 9...)
```

## reduce

Given an iterable, a callback and initial value, it applies the callback against an accumulator and each value that produces the iterable (from left to right) to reduce it to a single value.

If `reduce` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `reduce :: @[a] ~> ((b, a) -> b, b) -> b`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([5, 2, 1])
    .reduce((x, y) => x - y, 0) // 0 - 5 - 2 - 1 === 2
```

### `reduce :: ((b, a) -> b) -> b -> [a] -> b`

#### Example:
``` javascript
const {reduce} = require('iterum')

reduce((x, y) => x - y, 0, [5, 2, 1]) // 0 - 5 - 2 - 1 === 2
```

## reduceRight

Given an iterable, a callback and initial value, it applies the callback against an accumulator and each value that produces the iterable (from right to left) to reduce it to a single value.

If `reduceRight` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `reduceRight :: @[a] ~> ((b, a) -> b, b) -> b`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([5, 2, 1])
    .reduceRight((x, y) => x - y, 0) // 0 - 1 - 2 - 5 === -8
```


### `reduceRight :: ((b, a) -> b) -> b -> [a] -> b`

#### Example:
``` javascript
const {reduceRight} = require('iterum')

reduceRight((x, y) => x - y, 0, [5, 2, 1]) // 0 - 1 - 2 - 5 === -8
```

## repeat

Given an iterable and a number `n`, it returns an new iterable that iterates over all values produced by the iterable for `n` times.

If `repeat` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `repeat :: @[a] ~> Number -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([7, 3, 1])
iterable.repeat(4) // (7 3 1 7 3 1 7 3 1 7 3 1)
iterable.repeat(Infinity) // (7 3 1 7 3 1...)
iterable.repeat('a') // throws a TypeError
```

### `repeat :: Number -> [a] -> @[a]`

#### Example:
``` javascript
const {repeat} = require('iterum')

const iterable = [7, 3, 1]
repeat(4, iterable) // (7 3 1 7 3 1 7 3 1 7 3 1)
repeat(Infinity, iterable) // (7 3 1 7 3 1...)
repeat('a', iterable) // throws a TypeError
```

## slice

Given an iterable, a `start` number and `end` number, it returns a new iterable that iterates over all values produced by the iterable between `start` and `end` positions, `end` not included.

If `slice` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `slice :: @[a] ~> (Number, Number) -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {range} = Iterum

range(5, Infinity)
    .slice(1, 4) // (6 7 8)
```

### `slice :: Number -> Number -> [a] -> @[a]`

#### Example:
``` javascript
const {range, slice} = require('iterum')

slice(1, 4, range(5, Infinity)) // (6 7 8)
```

## some
Given an iterable and a predicate, it checks if predicate returns truthy for any value that generates the iterable. Iteration is stopped once predicate returns truthy.

If `some` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `some :: @[a] ~> (a -> Boolean) -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([0, 1, 2])
    .some(num => num === 1) // true
Iterum([0, 1, 2])
    .some(num => num === -2) // false
    Iterum([0, 1, 2])
    .some({}) // throws a TypeError
```

### `some :: (a -> Boolean) -> [a] -> Boolean`

#### Example:
``` javascript
const Iterum = require('iterum')

some(num => num === 1, [0, 1, 2]) // true
some(num => num === -2, [0, 1, 2]) // false
some({}, [0, 1, 2]) // throws a TypeError
```

## take

Given an iterable and a number `n`, it returns a new iterables that iterates over the `n` first values of the iterable object.

If `take` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `take :: @[a] ~> Number -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')
const {range} = Iterum

range(1, 2000)
    .take(3) // (1 2 3)
```

### `take :: Number -> [a] -> @[a]`

#### Example:
``` javascript
const {take, range} = require('iterum')

take(3, range(1, 2000)) // (1 2 3)
```

## takeWhile

Given an iterable and a predicate, it returns a new iterable that iterates over the first values of iterable that matches to predicate.

If `takeWhile` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `takeWhile :: @[a] ~> (a -> Boolean) -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([2, 5, 8, 10, 9, 8, 7, 6, 5, 4])

iterable.takeWhile(num => num % 3 === 2) // (2 5 8)
iterable.takeWhile(null) // throws a TypeError
```

### `takeWhile :: (a -> Boolean) -> [a] -> @[a]`

#### Example:
``` javascript
const {takeWhile} = require('iterum')

const iterable = [2, 5, 8, 10, 9, 8, 7, 6, 5, 4]

takeWhile(num => num % 3 === 2, iterable) // (2 5 8)
takeWhile(null, iterable) // throws a TypeError
takeWhile(num => num % 3 === 2, {}) // throws a TypeError
```

## transpose

Given an iterable of iterables, it returns a new iterable that has values transposed. It is a generalization of [zip]() for a countable number of iterables.

If `transpose` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `transpose :: @[@[a]] ~> @[@[a]]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]).transpose() /* (
    (1 4 7)
    (2 5 8)
    (3 6 9)
) */

Iterum([
    [1, 2],
    'abcd',
    [7, 8, 9]
]).transpose() /* (
    (1 'a' 7)
    (2 'b' 8)
) */
```

### `transpose :: [[a]] -> @[@[a]]`

#### Example:
``` javascript
const {transpose} = require('iterum')

transpose([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]) /* (
    (1 4 7)
    (2 5 8)
    (3 6 9)
) */

transpose([
    [1, 2],
    'abcd',
    [7, 8, 9]
]) /* (
    (1 'a' 7)
    (2 'b' 8)
) */
```

## uniq

Given an iterable it returns a new `Iterum` instance that iterates over the values without duplications using [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons. The order of iteration values is determined by the order they occur in the iterable object.

If `uniq` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `uniq :: @[a] ~> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([1, NaN, 4, '1', NaN, 3, 1, 4])
    .uniq() // (1 NaN 4 '1' 3)
```

### `uniq :: [a] -> @[a]`

#### Example:
``` javascript
const {uniq} = require('iterum')

uniq([1, NaN, 4, '1', NaN, 3, 1, 4]) // (1 NaN 4 '1' 3)
uniq({foo: 'bar'}) // throwS a TypeError
```

## uniqBy

Given an iterable and a callback `cb`, it returns a new iterable that iterates over the values without duplications using [sameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) equality comparison over `cb` transformation. For example, `a` and `b` values are equal if `sameValueZero(cb(a), cb(b))` returns `true`. The order of iteration values is determined by the order they occur in the iterable object.

If `uniqBy` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `uniqBy :: @[a] ~> (a -> Boolean) -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum(['abc', '2.1', '3', '2.4', 'cba'])
    .uniqBy(parseInt) // ('abc', '2.1', '3')
```

### `uniqBy :: (a -> Boolean) -> [a] -> @[a]`

#### Example:
``` javascript
const {uniqBy} = require('iterum')

uniqBy(parseInt, ['abc', '2.1', '3', '2.4', 'cba']) // ('abc', '2.1', '3')
```

## uniqWith

Given an iterable and a binary predicate `cmp`, it returns a new iterable that iterates over the values without duplications using `cmp` for equality comparisons. The order of iteration values is determined by the order they occur in the iterable object.

If `uniqWith` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `uniqWith :: @[a] ~> ((a, b) -> Boolean) -> @[a]`

#### Example
``` javascript
const Iterum = require('iterum')

const cmpPairDiff = (a, b) => a[0] - a[1] === b[0] - b[1]

const iterable = Iterum([[5, 2], [2, 0], [2, 3], [-2, -1], [3, 0], [1, 4]])

iterable.uniqWith(cmpPairDiff) // ([5, 2] [2, 0] [2, 3] [1, 4])
iterable.uniqWith([5, 2]) // throw a TypeError
```

### `uniqWith :: ((a, b) -> Boolean) -> [a] -> @[a]`

#### Example
``` javascript
const {uniqWith} = require('iterum')

const cmpPairDiff = (a, b) => a[0] - a[1] === b[0] - b[1]

const iterable = [[5, 2], [2, 0], [2, 3], [-2, -1], [3, 0], [1, 4]]

uniqWith(cmpPairDiff, iterable) // ([5, 2] [2, 0] [2, 3] [1, 4])
uniqWith([5, 2], iterable) // throw a TypeError
uniqWith(cmpPairDiff, 3) // throw a TypeError
```

## variations

Given an iterable and a number `n`, it returns a new iterable that iterates over the [variations over n or n-permutations](https://en.wikipedia.org/wiki/Permutation#k-permutations_of_n) of iterable.

If `variations` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `variations :: @[a] ~> Number -> @[@[a]]`

#### Example:
``` javascript
const Iterum = require('iterum')

Iterum([1, 2, 3]).variations(2) /* (
   (1 2)
   (2 1)
   (1 3)
   (3 1)
   (2 3)
   (3 2)
) */
```

### `variations :: Number -> [a] -> @[@[a]]`

#### Example:
``` javascript
const {variations} = require('iterum')

variations(2, [1, 2, 3]) /* (
   (1 2)
   (2 1)
   (1 3)
   (3 1)
   (2 3)
   (3 2)
) */
```

## zip

Given two iterables, it returns a new iterable that iterates over iterable values grouped by pairs, the first of which contains the first elements of the given `iterables`, the second of which contains the second elements of the given `iterables`, and so on.

If `zip` method or function does not follow the signatures specified below, it throws a `TypeError`.

### `zip :: @[a] ~> [a] -> @[a]`

#### Example:
``` javascript
const Iterum = require('iterum')

const iterable = Iterum([3, 2, 8])

iterable.zip([4, 5, 6]) // ((3 4) (2 5) (8 6))
iterable.zip([10, 0]) // ((3 10) (2 0))
iterable.zip(5) // throws a TypeError
```

### `zip :: [a] -> [a] -> @[a]`

#### Example:
``` javascript
const {zip} = require('iterum')

const iterable = [3, 2, 8]

zip(iterable, [4, 5, 6]) // ((3 4) (2 5) (8 6))
zip(iterable, [10, 0]) // ((3 10) (2 0))
zip(5, iterable) // throws a TypeError
zip(iterable, {}) // throws a TypeError
```
