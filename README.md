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

## Documentation
- [Introduction of lazy iterables]()
- [lazy methods]()
- [eager methods]()

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
- [static methods](doc/API_static_methods.md#static-methods)
    - [cartesian](doc/API_static_methods.md#iterumcartesian-iterable-iterables)
    - [concat](doc/API_static_methods.md#iterumconcat-iterable-iterables)
    - [drop](doc/API_static_methods.md#iterumdrop-iterable-n--1)
    - [dropWhile](doc/API_static_methods.md#iterumdropwhile-iterable-predicate-context)
    - [entries](doc/API_static_methods.md#iterumentries-iterable)
    - [every](doc/API_object_methods.md#every-predicate-context--this)
    - [find](doc/API_static_methods.md#iterumfind-iterable-predicate-context)
    - [findEntry](doc/API_static_methods.md#iterumfindentry-iterable-predicate-context)
    - [findIndex](doc/API_static_methods.md#iterumfindindex-iterable-predicate-context)
    - [filter](doc/API_static_methods.md#iterumfilter-iterable-predicate-context)
    - [flatten](doc/API_static_methods.md#iterumflatten-iterable-depth--1)
    - [forEach](doc/API_static_methods.md#iterumforeach-iterable-cb-context)
    - [includes](doc/API_static_methods.md#iterumincludes-iterable-value-fromindex--0)
    - [indexOf](doc/API_static_methods.md#iterumindexof-iterable-value-fromindex--0)
    - [map](doc/API_static_methods.md#iterummap-iterable-cb-context)
    - [padEnd](doc/API_static_methods.md#iterumpadend-iterable-length--0-value--undefined)
    - [range](doc/API_static_methods.md#iterumrangestart--0-end--infinity-step--1)
    - [reduce](doc/API_static_methods.md#iterumreduce-iterable-callback-initialvalue)
    - [reduceRight](doc/API_static_methods.md#iterumreduceright-iterable-callback-initialvalue)
    - [repeat](doc/API_static_methods.md#iterumrepeatiterable-n--infinity)
    - [slice](doc/API_static_methods.md#iterumslice-iterable-start--0-end--infinity)
    - [some](doc/API_static_methods.md#iterumsome-iterable-callback-context)
    - [take](doc/API_static_methods.md#iterumtake-iterable-n--1)
    - [takeWhile](doc/API_static_methods.md#iterumtakewhile-iterable-predicate-context)
    - [zip](doc/API_static_methods.md#iterumzip-iterable-iterables)

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