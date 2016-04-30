# Iterum

A set of utilities to use iterators in ES5 without using of ES6 `yield` keyword. This library aims to provide a set of iterator constructors and methods that provides an algebra that allows to create iterators based on other iterators.

## Version
0.4.0

## Installation

``` bash
$ npm install iterum
```

## API
- [Iterum constructor](doc/API_constructor.md)
    - [Value](doc/API_constructor.md#value-value)
    - [Function](doc/API_constructor.md#function)
    - [Range](doc/API_constructor.md#range-start-end-increase)
    - [Empty](doc/API_constructor.md#empty)
- [Iterum methods](doc/API_methods.md)
    - [.concat](doc/API_methods.md#concat-iterator)
    - [.every](doc/API_methods.md#every-cb-context)
    - [.filter](doc/API_methods.md#filter-cb-context)
    - [.indexOf](doc/API_methods.md#indexOf-value)
    - [.map](doc/API_methods.md#map-cb-context)
    - [.slice](doc/API_methods.md#slice-start-end)
    - [.some](doc/API_methods.md#some-cb-context)
    - [.toArray](doc/API_methods.md#toarray-)
- [Static Functions](doc/API_functions.md)
    - [compose](doc/API_functions.md#compose-generators)

## License
MIT
