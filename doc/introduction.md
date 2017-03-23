# Introduction

## lazy iterables

[Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) interface has been introduced by ES2015. An object that implements this interface has a `Symbol.iterator` property with a generator value which arity is 0. For example we can create an `obj` variable that implements `Iterable` interface:

``` javascript
let obj = {
    [Symbol.iterator]: function* () {
        for (let i = 0; i <= 10; ++i) {
            yield i
        }
    }
}
```

Any object that implements the Iterable interface can use [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement and the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator). For example:

``` javascript 
[...obj] // returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for (let x of obj) {
  // x traverses all values between 0 and 10
}
```

The interesting thing is that, unlike [built-in iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Built-in_iterables) (Array, Set, Map, String, etc), the `obj` variable is a **lazy iterable**. It means that, thanks to generators, `obj` does not have the computed values in memory and its values are computed just when are required. Then, we could create a new lazy iterable object that iterates over the double of values produced by `obj` without computing or saving `obj` values in memory:

``` javascript
let doubleObj = {
    [Symbol.iterator]: function* () {
        for (let x of obj) {
            yield 2 * x
        }
    }
}

[...doubleObj] // returns [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

This package takes advantage of lazy iterables and provides a collection of methods that builds new lazy iterables based on other iterables. These methods are named [lazy methods](#lazy-methods). The package also provides some [eager methods](#eager-methods) based on javascript [Array specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). 

Finally, the previous example with Iterum class can be expressed thus:

``` javascript
// potentially [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let obj = Iterum.range(0, 10)
// potentially [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
let doubleObj = obj.map(e => 2 * e)
```

### Lazy methods
They are methods that create new `Iterum` instances without iterating over values that produces the iterable object. The values that produces the iterable are not computed whether the values are not required by spread operator, for..of statement or [eager methods](#eager-methods).

### Example:
``` javascript
Iterum([1]) // potentially [1]
    .concat([4]) // potentially [1, 4]
    .map(e => [e, 3 * e]) // potentially [[1, 3], [4, 12]]
    .flatten() // potentially [1, 3, 4, 12]
    .cartesian('ab') /* potentially [
         [1, 'a'], [1, 'b'], [3, 'a'], [3, 'b'],
         [4, 'a'], [4, 'b'], [12, 'a'], [12, 'b']
   ] */
```

The lazy methods are [cartesian](API.md#cartesian-iterables), [concat](API.md#concat-iterables), [drop](API.md#drop-n--1), [dropWhile](API.md#dropwhile-predicate-context--this), [entries](API.md#entries-), [filter](API.md#filter-predicate-context--this), [flatten](API.md#flatten-depth--1), [map](API.md#map-cb-context--this), [padEnd](API.md#padend-length--0-value--undefined), [range](API.md#iterumrangestart--0-end--infinity-step--1) (static method), [repeat](API.md#repeatn--infinity), [slice](API.md#slice-start--0-end--infinity), [take](API.md#take-n--1), [takeWhile](API.md#takewhile-predicate-context--this) and [zip](API.md#zip-iterables)

## eager methods

They are methods that iterate over values of iterable object to compute the value that returns.

### Example:
``` javascript
const iterable = Iterum([1, 5, 2]) // potentially [1, 5, 2]
iterable.every(e => e < 4) // returns false
iterable.findIndex(e => e % 3 === 2) // returns 1
iterable.includes(2) // returns true
iterable.reduce((a, b) => a + b, 0) // returns 8 (1 + 5 + 2) 
```

The eager methods are [every](API.md#every-predicate-context--this), [find](API.md#find-predicate-context--this), [findEntry](API.md#findentry-predicate-context--this), [findIndex](API.md#findindex-predicate-context--this), [forEach](API.md#foreach-cb-context), [includes](API.md#includes-value-fromindex--0), [indexOf](API.md#indexof-value-fromindex--0), [reduce](API.md#reduce-cb-initialvalue), [reduceRight](API.md#reduceright-cb-initialvalue) and [some](API.md#some-predicate-context--this)