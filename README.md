# Iterum

A set of utilities to use iterators and generators in ES5 without using of ES6 `yield` keyword. This library aims to provide a set of generator constructors and methods that provides an algebra that allows to create ge based generators on other generators.

## Version
0.3.0

## Installation

``` bash
$ npm install iterum
```

## Usage
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range
var List = Iterum.List

var iterumBuilder = Iterum(Range(1, 5, 2))
    .concat(List([6, 2, 3, 4]))
    .map(function (value) {
        return 2 * value
    })
    .filter(function (value) {
        return value < 10
    })

var iterum = iterumBuilder.build()
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
