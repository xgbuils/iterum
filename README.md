# Iterum

A set of utilities to use iterators in ES5 without using of ES6 `yield` keyword. This library aims to provide a set of iterator constructors and methods that provides an algebra that allows to create iterators based on other iterators.

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

var genBuilder = Iterum(Range(1, 5, 2))
    .concat(List([6, 2, 3, 4]))
    .map(function (value) {
        return 2 * value
    })
    .filter (function (value) {
        return value < 10
    })

var gen = genBuilder.build()
var it = gen()
it.next() // {value: 2, done: false}
it.next() // {value: 6, done: false}
it.next() // {value: 4, done: false}
it.next() // {value: 6, done: false}
it.next() // {value: 8, done: false}
it.next() // {value: undefined, done: true}

// or
genBuilder.toArray(5) // [2, 6, 4, 6, 8]
```

## API
- [constructor functions (Creating generators)](doc/API_constructor.md)
    - [raw generator function](doc/API_constructor.md#function)
    - [Range](doc/API_constructor.md#range-start-end-increase)
    - [List](doc/API_constructor.md#list-array)
    - [Value](doc/API_constructor.md#value-value)
    - [Empty](doc/API_constructor.md#empty)
    - [Repeat](doc/API_constructor.md#repeat-value-times)
- [value methods](doc/API_value_methods)
    - [.build](doc/API_value_methods.md#build-)
    - [.toArray](doc/API_value_methods.md#toarray-)
    - [.every](doc/API_value_methods.md#every-cb-context)
    - [.indexOf](doc/API_value_methods.md#indexOf-value)
    - [.some](doc/API_value_methods.md#some-cb-context)
- [transform methods](doc/API_transform_methods.md)
    - [.concat](doc/API_transform_methods.md#concat-iterator)
    - [.filter](doc/API_transform_methods.md#filter-cb-context)
    - [.map](doc/API_transform_methods.md#map-cb-context)
    - [.slice](doc/API_transform_methods.md#slice-start-end)
- [Static Functions](doc/API_functions.md)
    - [compose](doc/API_functions.md#compose-generators)

## License
MIT
