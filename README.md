# Iterum

![travis ci](https://travis-ci.org/xgbuils/iterum.svg?branch=master)

Iterum aims to provide a set of generator constructors and methods that provide an algebra which allows to create generators based on other generators. It is inspired in [Array javascript specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and applied in generator/iterator context. 

Iterum is an agnostic module and does not need to use ES6 generators to work. Considering an iterator as an object with `next` function that returns an object with `value` and `done` properties and figuring that a generator is a function that returns an iterator, it can work perfectly well.

## Version
0.5.0

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
    .concat(List([6, 2, 3, 4])) // potential [1, 3, 5, 6, 2, 3, 4]
    .map(function (value) {
        return 2 * value
    }) // potential [2, 6, 10, 12, 4, 6, 8]
    .filter(function (value) {
        return value < 10
    }) // potential [2, 6, 4, 6, 8]

var gen = iterumBuilder.build()
var it = gen()
it.next() // {value: 2, done: false}
it.next() // {value: 6, done: false}
it.next() // {value: 4, done: false}
it.next() // {value: 6, done: false}
it.next() // {value: 8, done: false}
it.next() // {value: undefined, done: true}

// or
iterumBuilder.toArray(5) // [2, 6, 4, 6, 8]
```

## API
- [constructor functions (Creating generators)](doc/API_constructor.md)
    - [List](doc/API_constructor.md#list-array)
    - [Range](doc/API_constructor.md#range-start-end-increase--1)
    - [Value](doc/API_constructor.md#value-value)
    - [Empty](doc/API_constructor.md#empty-)
    - [Repeat](doc/API_constructor.md#repeat-value-n--infinity)
    - [customized generator functions](doc/API_constructor.md#functions-customized-generators)
- [value methods](doc/API_value_methods.md)
    - [.build](doc/API_value_methods.md#build-)
    - [.toArray](doc/API_value_methods.md#toarray-)
    - [.every](doc/API_value_methods.md#every-cb-context--this)
    - [.indexOf](doc/API_value_methods.md#indexof-elem)
    - [.some](doc/API_value_methods.md#some-cb-context--this)
- [transform methods](doc/API_transform_methods.md)
    - [.concat](doc/API_transform_methods.md#concat-generator)
    - [.filter](doc/API_transform_methods.md#filter-cb-context--this)
    - [.map](doc/API_transform_methods.md#map-cb-context--this)
    - [.slice](doc/API_transform_methods.md#slice-start--0-end--infinity)
- [Static Functions](doc/API_static_functions.md)
    - [compose](doc/API_static_functions.md#iterumcompose-generators)

## License
MIT
