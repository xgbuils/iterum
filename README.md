# Iterum

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`iterum` library aims to provide a lazy iterable class `Iterum` that has a set of inmutable methods and functions inspired in [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) functions. This library also adds a set of combinatorial functions like `permutations`, `combinations`, `variations`, `product`, `power` and `powerSet` that has a high computational cost but this library is able to support taking advantage of lazy evaluation.

## Why Iterum?
[Iterable interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) introduced by ES2015 version is defined by `[Symbol.iterator]` generator that is inherently lazy. However, an object that implements iterable interface provides [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement and [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) that are eager operations. `Iterum` class builds iterable objects that provides methods like `filter` and `map` to work with iterables like arrays but lazily.

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
const {range} = Iterum

const lazyIterable = range(1, Infinity) // (1 2 3 4 5 6 7 8...)
    .map(value => 2 * value) // (2 4 6 8 10 12 14 16...)
    .filter(value => value % 3 === 0 || value % 3 === 1) // (4 6 10 12 16...)
    .take(5) // (4 6 10 12 16)
    .concat([1, 2, 3]) // (4 6 10 12 16 1 2 3)

// converting to array:
[...lazyIterable] // [4, 6, 10, 12, 16, 1, 2, 3]

// traversing values:
for (let val of lazyIterable) {
    // ...
}

// creating an iterator that traverses the values
let iterator = lazyIterable[Symbol.iterator]()
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 10, done: false}
iterator.next() // {value: 12, done: false}
iterator.next() // {value: 16, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: undefined, done: true}
```

## [Introduction](doc/introduction.md)
- [Introduction of lazy iterables](doc/introduction.md#lazy-iterables)
- [lazy methods](doc/introduction.md#lazy-methods)
- [eager methods](doc/introduction.md#eager-methods)

## [Features of `iterum` library](doc/features.md)
- [support of method & function syntax](doc/features.md)
- [functional style: functions auto-curried & iterable last](doc/features.md)
- [maximizing the support of infinite iterables](doc/features.md)
- [supporting combinatorial hight cost functions](doc/features.md)
- [thinking about modularity](doc/features.md)
- [thinking about performance](doc/features.md)

## [API Documentation](doc/API.md)

## Customized builds
`Iterum` allows to build just what you need. Read [customized build section](doc/customized_builds.md) for more information

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
  