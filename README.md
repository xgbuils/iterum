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

## [Introduction](doc/introduction.md)
- [Introduction of lazy iterables](doc/introduction.md#lazy-iterables)
- [lazy methods](doc/introduction.md#lazy-methods)
- [eager methods](doc/introduction.md#eager-methods)

## API
- [constructor](doc/API.md#iterum-iterable)
    - [Iterum](doc/API.md#iterum-iterable)
- [object methods](doc/API.md#object-methods) 
    - [.cartesian](doc/API.md#cartesian-iterables) 
    - [.concat](doc/API.md#concat-iterables)
    - [.drop](doc/API.md#drop-n--1)
    - [.dropWhile](doc/API.md#dropwhile-predicate-context--this)
    - [.entries](doc/API_lazy_methods.md#entries-)
    - [.every](doc/API.md#every-predicate-context--this)
    - [.filter](doc/API.md#filter-predicate-context--this)
    - [.find](doc/API.md#find-predicate-context--this)
    - [.findEntry](doc/API.md#findentry-predicate-context--this)
    - [.findIndex](doc/API.md#findindex-predicate-context--this)
    - [.flatten](doc/API_lazy_methods.md#flatten-depth--1)
    - [.forEach](doc/API.md#foreach-cb-context)
    - [.includes](doc/API.md#includes-value-fromindex--0)
    - [.indexOf](doc/API.md#indexof-value-fromindex--0)
    - [.map](doc/API.md#map-cb-context--this)
    - [.padEnd](doc/API_lazy_methods.md#padend-length--0-value--undefined)
    - [.reduce](doc/API.md#reduce-cb-initialvalue)
    - [.reduceRight](doc/API.md#reduceright-cb-initialvalue)
    - [.repeat](doc/API.md#repeatn--infinity)
    - [.slice](doc/API.md#slice-start--0-end--infinity)
    - [.some](doc/API.md#some-predicate-context--this)
    - [.take](doc/API.md#take-n--1)
    - [.takeWhile](doc/API.md#takewhile-predicate-context--this)
    - [.zip](doc/API.md#zip-iterables)
- [static methods](doc/API.md#static-methods)
    - [cartesian](doc/API.md#iterumcartesian-iterable-iterables)
    - [concat](doc/API.md#iterumconcat-iterable-iterables)
    - [drop](doc/API.md#iterumdrop-iterable-n--1)
    - [dropWhile](doc/API.md#iterumdropwhile-iterable-predicate-context)
    - [entries](doc/API.md#iterumentries-iterable)
    - [every](doc/API.md#every-predicate-context--this)
    - [find](doc/API.md#iterumfind-iterable-predicate-context)
    - [findEntry](doc/API.md#iterumfindentry-iterable-predicate-context)
    - [findIndex](doc/API.md#iterumfindindex-iterable-predicate-context)
    - [filter](doc/API.md#iterumfilter-iterable-predicate-context)
    - [flatten](doc/API.md#iterumflatten-iterable-depth--1)
    - [forEach](doc/API.md#iterumforeach-iterable-cb-context)
    - [includes](doc/API.md#iterumincludes-iterable-value-fromindex--0)
    - [indexOf](doc/API.md#iterumindexof-iterable-value-fromindex--0)
    - [map](doc/API.md#iterummap-iterable-cb-context)
    - [padEnd](doc/API.md#iterumpadend-iterable-length--0-value--undefined)
    - [range](doc/API.md#iterumrangestart--0-end--infinity-step--1)
    - [reduce](doc/API.md#iterumreduce-iterable-callback-initialvalue)
    - [reduceRight](doc/API.md#iterumreduceright-iterable-callback-initialvalue)
    - [repeat](doc/API.md#iterumrepeatiterable-n--infinity)
    - [slice](doc/API.md#iterumslice-iterable-start--0-end--infinity)
    - [some](doc/API.md#iterumsome-iterable-callback-context)
    - [take](doc/API.md#iterumtake-iterable-n--1)
    - [takeWhile](doc/API.md#iterumtakewhile-iterable-predicate-context)
    - [zip](doc/API.md#iterumzip-iterable-iterables)

## Customize builds
`Iterum` allows to build just what you need. Read [customized build section](doc/customized_builds.md) for more information

## Author and contributors
- [xgbuils](https://github.com/xgbuils), Xavier Garcia buils (Author)

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