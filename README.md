# Iterum

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`iterum` library aims to provide a lazy iterable class `Iterum` that has a set of inmutable methods inspired in [Array javascript methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [underscore](http://underscorejs.org/)/[lodash](https://lodash.com) functions.

## Why Iterum?
[Iterable interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) introduced by ES2015 version allows an easy way to implement Array-like **lazy** methods by the aid of generators. However an object that implements Iterable interface is just able to use [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement and [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) that are eager operations. `Iterum class` builds iterables that has these [Array-like methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array) and, then, you can work transparently with lazy iterables like arrays.

## Support
- Node.js >=6
- ES2015 transpilers

## Install

``` bash
$ npm install iterum --save
```

## Usage
``` javascript
const Iterum = require('iterum')
const array = [6, 2]
const set = new Set()
    .add(5)
    .add(4)

const lazyIterable = Iterum.range(1, 7, 2) // potentially [1, 3, 5, 7]
    .concat(array, set) // potentially [1, 3, 5, 7, 6, 2, 5, 4]
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

## [API](doc/API.md)
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
    - [.groupBy](doc/API.md#groupby-cb--e--e)
    - [.includes](doc/API.md#includes-value-fromindex--0)
    - [.indexOf](doc/API.md#indexof-value-fromindex--0)
    - [.isEqual](doc/API.md#isequal-iterable)
    - [.isEqualBy](doc/API.md#isequalby-iterable-cb)
    - [.isEqualWith](doc/API.md#isequalwith-iterable-comparator--samevaluezero)
    - [.map](doc/API.md#map-cb-context--this)
    - [.padEnd](doc/API.md#padend-length--0-value--undefined)
    - [.permutations](doc/API.md#permutations-)
    - [.reduce](doc/API.md#reduce-cb-initialvalue)
    - [.reduceRight](doc/API.md#reduceright-cb-initialvalue)
    - [.repeat](doc/API.md#repeatn--infinity)
    - [.slice](doc/API.md#slice-start--0-end--infinity)
    - [.some](doc/API.md#some-predicate-context--this)
    - [.take](doc/API.md#take-n--1)
    - [.takeWhile](doc/API.md#takewhile-predicate-context--this)
    - [.uniq](doc/API.md#uniq-)
    - [.uniqBy](doc/API.md#uniqby-cb--e--e)
    - [.uniqWith](doc/API.md#uniqwith-cmp--samevaluezero)
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
    - [groupBy](doc/API.md#iterumgroupby-iterable-cb--e--e)
    - [includes](doc/API.md#iterumincludes-iterable-value-fromindex--0)
    - [indexOf](doc/API.md#iterumindexof-iterable-value-fromindex--0)
    - [isEqual](doc/API.md#iterumisequal-iterable1-iterable2)
    - [isEqualBy](doc/API.md#iterumisequalby-iterable1-iterable2-cb)
    - [isEqualWith](doc/API.md#iterumisequalwith-iterable1-iterable2-comparator--samevaluezero)
    - [map](doc/API.md#iterummap-iterable-cb-context)
    - [padEnd](doc/API.md#iterumpadend-iterable-length--0-value--undefined)
    - [permutations](doc/API.md#iterumpermutations-iterable)
    - [range](doc/API.md#iterumrangestart--0-end--infinity-step--1)
    - [reduce](doc/API.md#iterumreduce-iterable-callback-initialvalue)
    - [reduceRight](doc/API.md#iterumreduceright-iterable-callback-initialvalue)
    - [repeat](doc/API.md#iterumrepeatiterable-n--infinity)
    - [slice](doc/API.md#iterumslice-iterable-start--0-end--infinity)
    - [some](doc/API.md#iterumsome-iterable-callback-context)
    - [take](doc/API.md#iterumtake-iterable-n--1)
    - [takeWhile](doc/API.md#iterumtakewhile-iterable-predicate-context)
    - [uniq](doc/API.md#iterumuniq-iterable)
    - [uniqBy](doc/API.md#iterumuniqby-iterable-cb--e--e)
    - [uniqWith](doc/API.md#iterumuniqwith-iterable-predicate--samevaluezero)
    - [zip](doc/API.md#iterumzip-iterable-iterables)

## Customized builds
`Iterum` allows to build just what you need. Read [customized build section](doc/customized_builds.md) for more information

## Benchmarks

benchmark
    combinations
        array
            with traversing
                - small
                    - iterum x 19,091 ops/sec ±0.20% (88 runs sampled)
                    - es-iter x 22,987 ops/sec ±1.70% (87 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 1,979 ops/sec ±0.28% (94 runs sampled)
                    - es-iter x 3,362 ops/sec ±1.36% (92 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 157 ops/sec ±0.87% (85 runs sampled)
                    - es-iter x 305 ops/sec ±0.85% (88 runs sampled)
                    Fastest is es-iter
            without traversing
                - small
                    - iterum x 116,880 ops/sec ±0.90% (94 runs sampled)
                    - es-iter x 148,916 ops/sec ±4.52% (62 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 118,325 ops/sec ±1.03% (94 runs sampled)
                    - es-iter x 144,079 ops/sec ±3.36% (66 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 117,181 ops/sec ±1.29% (92 runs sampled)
                    - es-iter x 112,483 ops/sec ±2.94% (70 runs sampled)
                    Fastest is iterum
    permutations
        array
            with traversing
                - small
                    - iterum x 30,514 ops/sec ±0.35% (93 runs sampled)
                    - es-iter x 2,837 ops/sec ±2.36% (77 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 2,202 ops/sec ±1.02% (93 runs sampled)
                    - es-iter x 133 ops/sec ±2.45% (74 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 53.96 ops/sec ±0.21% (68 runs sampled)
                    - es-iter x 2.82 ops/sec ±1.62% (12 runs sampled)
                    Fastest is iterum
            without traversing
                - small
                    - iterum x 146,629 ops/sec ±0.35% (92 runs sampled)
                    - es-iter x 142,010 ops/sec ±3.79% (68 runs sampled)
                    Fastest is iterum,es-iter
                - medium
                    - iterum x 147,123 ops/sec ±0.90% (91 runs sampled)
                    - es-iter x 139,503 ops/sec ±2.99% (66 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 147,867 ops/sec ±0.27% (89 runs sampled)
                    - es-iter x 134,356 ops/sec ±4.15% (64 runs sampled)
                    Fastest is iterum,es-iter
    power
        array
            with traversing
                - small
                    - iterum power x 1,987 ops/sec ±0.26% (94 runs sampled)
                    - iterum product x 2,627 ops/sec ±0.24% (93 runs sampled)
                    Fastest is iterum product
                - medium
                    - iterum power x 252 ops/sec ±1.42% (82 runs sampled)
                    - iterum product x 347 ops/sec ±1.01% (89 runs sampled)
                    Fastest is iterum product
                - big
                    - iterum power x 24.33 ops/sec ±0.14% (44 runs sampled)
                    - iterum product x 33.19 ops/sec ±0.53% (57 runs sampled)
                    Fastest is iterum product
            without traversing
                - small
                    - iterum power x 109,499 ops/sec ±0.79% (92 runs sampled)
                    - iterum product x 138,860 ops/sec ±1.22% (88 runs sampled)
                    Fastest is iterum product
                - medium
                    - iterum power x 107,934 ops/sec ±1.67% (89 runs sampled)
                    - iterum product x 139,370 ops/sec ±1.11% (90 runs sampled)
                    Fastest is iterum product
                - big
                    - iterum power x 108,830 ops/sec ±1.10% (91 runs sampled)
                    - iterum product x 139,643 ops/sec ±1.06% (91 runs sampled)
                    Fastest is iterum product
    product
        array
            with traversing
                - small
                    - iterum x 3,274 ops/sec ±1.21% (92 runs sampled)
                    - es-iter x 4,762 ops/sec ±1.76% (88 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 864 ops/sec ±1.25% (91 runs sampled)
                    - es-iter x 1,330 ops/sec ±1.37% (91 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 220 ops/sec ±0.68% (82 runs sampled)
                    - es-iter x 346 ops/sec ±1.23% (89 runs sampled)
                    Fastest is es-iter
            without traversing
                - small
                    - iterum x 140,714 ops/sec ±1.16% (92 runs sampled)
                    - es-iter x 94,605 ops/sec ±2.27% (76 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 140,426 ops/sec ±1.37% (92 runs sampled)
                    - es-iter x 81,372 ops/sec ±2.78% (71 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 137,699 ops/sec ±0.42% (91 runs sampled)
                    - es-iter x 66,986 ops/sec ±2.85% (78 runs sampled)
                    Fastest is iterum
    slice
        array
            with traversing
                - small
                    - iterum x 76,888 ops/sec ±0.78% (88 runs sampled)
                    - imlazy x 105,341 ops/sec ±2.48% (88 runs sampled)
                    - ramda x 1,275,981 ops/sec ±1.72% (94 runs sampled)
                    - native x 1,517,578 ops/sec ±1.27% (84 runs sampled)
                    Fastest is native
                - medium
                    - iterum x 1,484 ops/sec ±0.58% (92 runs sampled)
                    - imlazy x 1,685 ops/sec ±1.02% (93 runs sampled)
                    - ramda x 148,798 ops/sec ±0.83% (93 runs sampled)
                    - native x 153,889 ops/sec ±0.92% (93 runs sampled)
                    Fastest is native
                - big
                    - iterum x 6.75 ops/sec ±3.18% (21 runs sampled)
                    - imlazy x 9.62 ops/sec ±0.25% (28 runs sampled)
                    - ramda x 3,241 ops/sec ±1.68% (93 runs sampled)
                    - native x 3,271 ops/sec ±0.13% (92 runs sampled)
                    Fastest is native,ramda
            without traversing
                - small
                    - iterum x 127,097 ops/sec ±0.36% (88 runs sampled)
                    - imlazy x 661,547 ops/sec ±0.55% (89 runs sampled)
                    - ramda x 3,306,763 ops/sec ±0.29% (90 runs sampled)
                    - native x 5,232,812 ops/sec ±0.95% (90 runs sampled)
                    Fastest is native
                - medium
                    - iterum x 125,073 ops/sec ±1.78% (92 runs sampled)
                    - imlazy x 653,945 ops/sec ±1.39% (91 runs sampled)
                    - ramda x 1,627,703 ops/sec ±1.46% (94 runs sampled)
                    - native x 2,022,904 ops/sec ±1.14% (92 runs sampled)
                    Fastest is native
                - big
                    - iterum x 125,547 ops/sec ±0.44% (90 runs sampled)
                    - imlazy x 657,263 ops/sec ±0.22% (92 runs sampled)
                    - ramda x 69,047 ops/sec ±1.48% (90 runs sampled)
                    - native x 70,276 ops/sec ±1.13% (94 runs sampled)
                    Fastest is imlazy
        set
            with traversing
                - small
                    - iterum x 80,322 ops/sec ±1.43% (94 runs sampled)
                    - imlazy x 96,666 ops/sec ±2.98% (87 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 1,372 ops/sec ±0.27% (92 runs sampled)
                    - imlazy x 1,612 ops/sec ±0.31% (92 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 6.19 ops/sec ±5.12% (20 runs sampled)
                    - imlazy x 9.03 ops/sec ±0.50% (26 runs sampled)
                    Fastest is imlazy
            two calls with traversing
                - small
                    - iterum x 44,948 ops/sec ±0.26% (95 runs sampled)
                    - imlazy x 48,092 ops/sec ±3.81% (84 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 699 ops/sec ±2.06% (89 runs sampled)
                    - imlazy x 818 ops/sec ±1.46% (90 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 3.00 ops/sec ±1.17% (12 runs sampled)
                    - imlazy x 4.57 ops/sec ±0.46% (16 runs sampled)
                    Fastest is imlazy
            without traversing
                - small
                    - iterum x 112,897 ops/sec ±0.21% (93 runs sampled)
                    - imlazy x 651,781 ops/sec ±0.49% (93 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 112,273 ops/sec ±0.25% (92 runs sampled)
                    - imlazy x 669,441 ops/sec ±0.15% (93 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 112,483 ops/sec ±1.70% (92 runs sampled)
                    - imlazy x 640,481 ops/sec ±2.91% (89 runs sampled)
                    Fastest is imlazy


## Contributors
- [xgbuils](https://github.com/xgbuils) (Author)

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
  