# Iterum

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`iterum` library aims to provide a lazy iterable class `Iterum` that has a set of inmutable methods mostly inspired in [Array javascript specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## Version
0.8.4

## Install

``` bash
$ npm install iterum --save
```

## Usage
``` javascript
const Iterum = require('iterum')


var lazyIterable = Iterum.range(1, 7, 2)) // potentially [1, 3, 5, 7]
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

The interesting thing is that, unlike built-in iterables, `obj` is a **lazy iterable**. It means that, thanks to generators, `obj` does not have the computed values in memory and its values are computed just when are required. Then, we could do a new lazy iterable object that iterates over the double of values produced by `obj` without computing its values:

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

This package takes advantage of lazy iterables and provides an Array-like API that builds new lazy iterables based on other iterables. The previous example with Iterum class can be expressed thus:

``` javascript
// potentially [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let obj = Iterum.range(0, 10)
// potentially [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
let doubleObj = obj.map(e => 2 * e)
```

## API
- [constructor functions (Creating Iterum instances)](doc/API_constructor.md)
    - [Iterum](doc/API_constructor.md#iterum-generator-boundparams)
    - [List](doc/API_constructor.md#list-array)
    - [Range](doc/API_constructor.md#range-start-end-increase--1)
    - [Value](doc/API_constructor.md#value-value)
    - [Empty](doc/API_constructor.md#empty-)
    - [Repeat](doc/API_constructor.md#repeat-value-n--infinity)
    - [Cartesian](doc/API_constructor.md#cartesian-list-lists)
- [value methods](doc/API_value_methods.md)
    - [.build](doc/API_value_methods.md#build-)
    - [.toArray](doc/API_value_methods.md#toarray-)
    - [.every](doc/API_value_methods.md#every-cb-context--this)
    - [.forEach](doc/API_value_methods.md#foreach-cb-context)
    - [.indexOf](doc/API_value_methods.md#indexof-elem)
    - [.reduce](doc/API_value_methods.md#reduce-cb-initialvalue)
    - [.reduceRight](doc/API_value_methods.md#reduceright-cb-initialvalue)
    - [.some](doc/API_value_methods.md#some-cb-context--this)
- [transform methods](doc/API_transform_methods.md)
    - [.concat](doc/API_transform_methods.md#concat-generator)
    - [.filter](doc/API_transform_methods.md#filter-cb-context--this)
    - [.map](doc/API_transform_methods.md#map-cb-context--this)
    - [.slice](doc/API_transform_methods.md#slice-start--0-end--infinity)
- [Static Functions](doc/API_static_functions.md)
    - [compose](doc/API_static_functions.md#iterumcompose-generators)
- [Iterum delegation](doc/iterum_delegation.md)
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