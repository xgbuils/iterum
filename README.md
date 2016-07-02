# Iterum

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`iterum` library aims to provide a set of generator constructors and methods that provide an algebra which allows to create generators based on other generators. 

`iterum` is an agnostic library and does not need to use ES6 generators to work. Considering an iterator as an object with `next` function that returns an object with `value` and `done` properties and, figuring that a generator is a function that returns an iterator, it can work perfectly well.

`Iterum` is the main class that exports the library. This provides a set of constructors as static properties (`Iterum.Range`, `Iterum.List`, etc) that build Iterum instances. An Iterum instance is object that wraps a 0-arity generator . `Iterum instance` has a set of `stateless` methods. This means that methods do not modify the wrapped generator. These methods are mostly inspired in [Array javascript specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). However, the methods are lazy and do not compute values that potentially are able to produce if these are not required.

## Version
0.8.1

## Install

``` bash
$ npm install iterum --save
```

## Usage
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range
var List = Iterum.List

var iterumBuilder = Iterum(Range(1, 5, 2)) // potential [1, 3, 5]
    .concat(List([6, 2, 3, 4])) // potentially [1, 3, 5, 6, 2, 3, 4]
    .map(function (value) {
        return 2 * value
    }) // potentially [2, 6, 10, 12, 4, 6, 8]
    .filter(function (value) {
        return value < 10
    }) // potentially [2, 6, 4, 6, 8]

var generator = iterumBuilder.build()
var iterator = generator()
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 8, done: false}
iterator.next() // {value: undefined, done: true}

// or
iterumBuilder.toArray() // [2, 6, 4, 6, 8]
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