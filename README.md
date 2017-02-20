# Iterum

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`iterum` library aims to provide a lazy iterable class `Iterum` that has a set of inmutable methods inspired in [Array javascript methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [underscore](http://underscorejs.org/)/[lodash](https://lodash.com) functions.

## Version
1.0.0

## Install

``` bash
$ npm install iterum --save
```

## Usage
``` javascript
const Iterum = require('iterum')

var lazyIterable = Iterum.range(1, 7, 2) // potentially [1, 3, 5, 7]
    .concat([6, 2, 5, 4]) // potentially [1, 3, 5, 7, 6, 2, 5, 4]
    .map(value => 2 * value) // potentially [2, 6, 10, 14, 12, 4, 10, 8]
    .filter(value => value < 10) // potentially [2, 6, 4, 8]

// Then,
// obtaining the array of values:
[...lazyIterable] // returns [2, 6, 4, 8] 
// traversing values:
for (let val of lazyIterable) {
    // ...
}
// creating an iterator that traverses the values
let iterator = lazyIterable[Symbol.iterator]()
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 8, done: false}
iterator.next() // {value: undefined, done: true}
```


## Introduction of lazy iterables

In ES2015 has been introduced the [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) concept. An iterable is an object that has a `Symbol.iterator` property with a generator which arity is 0. For example:

``` javascript
let obj = {
    [Symbol.iterator]: function* () {
        for (let i = 0; i <= 10; ++i) {
            yield i
        }
    }
}
```

Iterables can use [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement and the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator). For example:

``` javascript 
[...obj] // returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for (let x of obj) {
  // x traverses all values between 0 and 10
}
```

The interesting thing is that, unlike built-in iterables, `obj` is a **lazy iterable**. It means that, thanks to generators, `obj` does not have the computed values in memory and its values are computed just when are required. Then, we could create a new lazy iterable object that iterates over the double of values produced by `obj` without computing its values:

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

This package takes advantage of lazy iterables and provides an API that builds new lazy iterables based on other iterables. Then, the previous example with Iterum class can be expressed thus:

``` javascript
// potentially [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let obj = Iterum.range(0, 10)
// potentially [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
let doubleObj = obj.map(e => 2 * e)
```

## Iterum methods

This package provides two types of methods: **lazy methods** and **eager methods**.

### Lazy methods
They are methods that creates a new Iterum instances without iterating over  iterable object values.

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

The lazy methods are [cartesian](doc/API_lazy_methods.md#cartesian-iterables), [concat](doc/API_lazy_methods.md#concat-iterables), [drop](doc/API_lazy_methods.md#drop-n--1), [dropWhile](doc/API_lazy_methods.md#dropwhile-predicate-context--this), [entries](doc/API_lazy_methods.md#entries-),  [filter](doc/API_lazy_methods.md#filter-predicate-context--this), [flatten](doc/API_lazy_methods.md#flatten-depth--1), [map](doc/API_lazy_methods.md#map-cb-context--this), [.padEnd](doc/API_lazy_methods.md#padend-length--0-value--undefined),  [repeat](doc/API_lazy_methods.md#repeatn--infinity), [slice](doc/API_lazy_methods.md#slice-start--0-end--infinity), [take](doc/API_lazy_methods.md#take-n--1), [takeWhile](doc/API_lazy_methods.md#takewhile-predicate-context--this) and [zip](doc/API_lazy_methods.md#zip-iterables)

## eager methods

They are methods that iterates over values of iterable object to compute the value that returns.

### Example:
``` javascript
const iterable = Iterum([1, 5, 2]) // potentially [1, 5, 2]
iterable.every(e => e < 4) // returns false
iterable.findIndex(e => e % 3 === 2) // returns 1
iterable.includes(2) // returns true
iterable.reduce((a, b) => a + b, 0) // returns 8 (1 + 5 + 2) 
```

The eager methods are [every](doc/API_eager_methods.md#every-predicate-context--this), [find](doc/API_eager_methods.md#find-predicate-context--this), [findEntry](doc/API_eager_methods.md#findentry-predicate-context--this), [findIndex](doc/API_eager_methods.md#findindex-predicate-context--this), [forEach](doc/API_eager_methods.md#foreach-cb-context), [includes](doc/API_eager_methods.md#includes-value-fromindex--0), [indexOf](doc/API_eager_methods.md#indexof-value-fromindex--0), [reduce](doc/API_eager_methods.md#reduce-cb-initialvalue), [reduceRight](doc/API_eager_methods.md#reduceright-cb-initialvalue) and [some](doc/API_eager_methods.md#some-predicate-context--this)

## API
- [constructor](doc/API_constructor.md)
    - [Iterum](doc/API_constructor.md#iterum-generator-boundparams)
- [object methods](doc/API_object_methods.md) 
    - [.cartesian](doc/API_object_methods.md#cartesian-iterables) 
    - [.concat](doc/API_object_methods.md#concat-iterables)
    - [.drop](doc/API_object_methods.md#drop-n--1)
    - [.dropWhile](doc/API_object_methods.md#dropwhile-predicate-context--this)
    - [.entries](doc/API_lazy_methods.md#entries-)
    - [.every](doc/API_object_methods.md#every-predicate-context--this)
    - [.filter](doc/API_object_methods.md#filter-predicate-context--this)
    - [.find](doc/API_object_methods.md#find-predicate-context--this)
    - [.findEntry](doc/API_object_methods.md#findentry-predicate-context--this)
    - [.findIndex](doc/API_object_methods.md#findindex-predicate-context--this)
    - [.flatten](doc/API_lazy_methods.md#flatten-depth--1)
    - [.forEach](doc/API_object_methods.md#foreach-cb-context)
    - [.includes](doc/API_object_methods.md#includes-value-fromindex--0)
    - [.indexOf](doc/API_object_methods.md#indexof-value-fromindex--0)
    - [.map](doc/API_object_methods.md#map-cb-context--this)
    - [.padEnd](doc/API_lazy_methods.md#padend-length--0-value--undefined)
    - [.reduce](doc/API_object_methods.md#reduce-cb-initialvalue)
    - [.reduceRight](doc/API_object_methods.md#reduceright-cb-initialvalue)
    - [.repeat](doc/API_object_methods.md#repeatn--infinity)
    - [.slice](doc/API_object_methods.md#slice-start--0-end--infinity)
    - [.some](doc/API_object_methods.md#some-predicate-context--this)
    - [.take](doc/API_object_methods.md#take-n--1)
    - [.takeWhile](doc/API_object_methods.md#takewhile-predicate-context--this)
    - [.zip](doc/API_object_methods.md#zip-iterables)
- [static methods](doc/API_static_methods.md)
    - [cartesian](doc/API_static_methods.md#iterumcartesian-iterable-iterables)
    - [concat](doc/API_static_methods.md#iterumconcat-iterable-iterables)
    - [drop](doc/API_static_methods.md#iterumdrop-iterable-n--1)
    - [dropWhile](doc/API_static_methods.md#iterumdropwhile-iterable-predicate-context--this)
    - [entries](doc/API_static_methods.md#iterumentries-iterable)
    - [every](doc/API_object_methods.md#iterumevery-iterable-predicate-context--this)
    - [flatten](doc/API_static_methods.md#iterumflatten-iterable-depth--1)
    - [find](doc/API_static_methods.md#iterumfind-iterable-predicate-context--this)
    - [findEntry](doc/API_static_methods.md#iterumfindentry-iterable-predicate-context--this)
    - [findIndex](doc/API_static_methods.md#iterumfindindex-iterable-predicate-context--this)
    - [filter](doc/API_static_methods.md#iterumfilter-iterable-predicate-context--this)
    - [forEach](doc/API_static_methods.md#iterumforeach-iterable-cb-context)
    - [includes](doc/API_static_methods.md#iterumincludes-iterable-value-fromindex--0)
    - [indexOf](doc/API_static_methods.md#iterumindexof-iterable-value-fromindex--0)
    - [map](doc/API_static_methods.md#iterummap-iterable-cb-context--this)
    - [padEnd](doc/API_static_methods.md#iterumpadend-iterable-length--0-value--undefined)
    - [.range](doc/API_static_methods.md#iterumrange-iterable-start--0-end--infinity-step--1)
    - [.reduce](doc/API_static_methods.md#iterumreduce-iterable-cb-initialvalue)
    - [.reduceRight](doc/API_static_methods.md#reduceright-iterable-cb-initialvalue)
    - [repeat](doc/API_static_methods.md#iterumrepeatn--infinity)
    - [slice](doc/API_static_methods.md#iterumslice-iterable-start--0-end--infinity)
    - [some](doc/API_static_methods.md#iterumsome-iterable-predicate-context--this)
    - [take](doc/API_static_methods.md#iterumtake-iterable-n--1)
    - [takeWhile](doc/API_static_methods.md#iterumtakewhile-iterable-predicate-context--this)
    - [zip](doc/API_static_methods.md#iterumzip-iterable-iterables)
- [Customized builds (just import what you need!)](doc/customized_builds.md)

## License
MIT


  [1]: https://travis-ci.org/xgbuils/iterum.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/iterum
  [3]: https://badge.fury.io/js/iterum.svg
  [4]: https://badge.fury.io/js/iterum
  [5]: https://coveralls.io/repos/github/xgbuils/iterum/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/iterum?branch=master
  [7]: https://david-dm.org/xgbuils/iterum.svg
  [8]: https://david-dm.org/xgbuils/iterum