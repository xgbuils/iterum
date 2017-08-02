# Features

## Functional & method chaining approach

`iterum` implements two ways to handle iterable transformations: functional style and method chaining.

The library provides a sort of auto-curried functions and their parameters are arranged to make it convenient for composition. Then, the iterable is supplied last. On the other hand, the library bring a class that provides prototype methods for its object instances. Each method has its associated function that does the same. However there are functions like [range](API.md#range) and [rangeByStep](API.md#rangebystep) which do not have its associated method because these do not take iterables as arguments.

Example:
``` javascript
const Iterum = require('iterum')

// functional & auto-curried
const {map, filter, take} = Iterum
const filterOdd = filter(num % 2 === 1)
const mapDouble = map(num => 2 * num)
const takeThree = take(3)

takeThree(
    mapDouble(
        filterOdd([1, 2, 3, 4, 5, 6, 7]))) // (2 6 10)

Iterum([1, 2, 3, 4, 5, 6, 7])
    .filter(num % 2 === 1)
    .map(num => 2 * num)
    .take(3) // (2 6 10)
```


## Maximizing support for infinite iterables

Laziness is a property easy to implement using iterables. This property allows to manipulate infinite lists. This library take aware that all method and function implementations are lazy and, then, are able to create and transform infinite iterables.

``` javascript
const Iterum = require('iterum')
const {range} = Iterum

range(0, Infinity) // (0 1 2 3 4...)
    .map(e => e * e) // (0 1 4 9 16...)
    .zip(range(0, Infinity)) // ((0 0) (1 1) (4 2) (9 3) (16 4))
    .map(([first, second]) => first + second) // (0 2 6 12 20...)
    .drop(1) (2 6 12 20...)
    .permutations() /*
        (2 6 12 20...)
        (6 2 12 20...)
        (2 12 6 20...)
        (12 2 6 20...)
        (6 12 2 20...)
        ...
    */
    .map(xs => xs.map(x => x + 1)) /*
        (3 7 13 21...)
        (7 3 13 21...)
        (3 13 7 21...)
        (13 3 7 21...)
        (7 13 3 21...)
        ...
    */
```

## No consumible iterables

Some libraries like [es-iter](https://github.com/abozhilov/ES-Iter), [wu.js](https://github.com/fitzgen/wu.js/), [js-itertools](https://github.com/aureooms/js-itertools), etc. provide methods or functions that return iterables that are at the same time iterators. Then, the returned value is consumed on the first iteration:

``` javascript
const iterable = L([1, 2, 3, 4])
    .map(e => 2 * e)

;[...iterable] // [2, 4, 6, 8]
;[...iterable] // []
```

Sometimes this behaviour is not a problem in the case of the result is required once. However it could produce unexpected behaviours if intermediate iterables are used several times:

``` javascript
const mappedIterable = L([1, 2, 3, 4])
    .map(e => 2 * e) // (2 4 6 8)

// Then, we need concat with other iterable:
const concatIterable = mappedIterable
    .concat([1, 3, 5]) // (2 4 6 8 1 3 5)

// Then, we need to use mappedIterable for filter some values:
const filteredIterable = mappedIterable
    .filter(e => e % 4 === 0) // (4 8)

// concatIterable returns the expected value
;[...concatIterable] // [2, 4, 6, 8, 1, 3, 5]
// filteredIterable, not
;[...filteredIterable] // []

```

`filteredIterable` is empty because `mappedIterable` is traversed indirectly when `concatIterable` is traversed. 'iterum' library prevent this issues creating iterables that are not iterators.

## Combinatorial hight cost functions

Laziness allows to implement combinatorial functions that potentially produces an exponential number of values without consuming them. This library take advantage on that for implementing several functions and methods like [combinations](API.md#combinations), [permutations](API.md#permutations), [variations](API.md#variations), cartesian [product](API.md#product), cartesian [power](API.md#power) and [powerSet](API.md#powerset).

Someone can be tempted to implement these functions recursively because it is the most natural implementation. However, this library avoids the recursivity for preventing to overflow the stack.

## Thinking about modularity

Sometimes, when the enviroments require to optimize the size of the scripts, it is not needed to use all features of some library. In this case, it is possible to create [iterum customized builds](customized_builds.md).

## Thinking about performance

Performance is one of the points that this project take into account. However, at the moment the project has focused on implement a large number of functions and methods and ensure their quality. It will be done some optimizations for improving the performace soon. Until now, there are some [benchmarks](benchmarks.md) to track the perfomance of `iterum`.
