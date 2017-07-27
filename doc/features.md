# features of `iterum` library

## support of function & method syntax

`iterum` implements two ways to handle iterable transformations: functional style and method chaining.

The library provides a sort of auto-curried functions and their parameters are arranged to make it convenient for composition. Then the iterable is supplied last. On the other hand, the library provides a class that provides prototype methods for its object instances. Each method has its associated function that does the same. However there are functions like [range]() and [rangeByStep]() do not have its associated method because these functions do not take iterables as arguments.

``` javascript
// functional style
const Iterum = require('iterum')
const {filter, map} = Iterum

// functional style
map(c => c + '_',
    filter(c => c !== 'b', 'abcd'))

// method chaining style
Iterum('abcd') // ('a' 'b' 'c' 'd')
    .filter(c => c !== 'b') // ('a' 'c' 'd')
    .map(c => c + '_') // ('a_' 'c_' 'd_')
```

## maximizing the support of infinite iterables

Laziness is a property easy to implement using iterables. This property allows to manipulate infinite lists. This library take aware that all method and function implementations are lazy and, then, are able to create and transform infinite iterables.

## preventing iterable autoconsumption

Generators return iterables that are at the same time iterators. Then, once traversed the iterable, it is not able to be traversed again. However, Iterum constructor can take an iterator and return an iterable that is not autoconsumed.

``` javascript
const Iterum = require('iterum')

function* gen() {
    yield 1
    yield 3
    yield 5
}

const iterator = gen()

const iterable = Iterum(iterator)

[...iterable] // [1, 3, 5]
[...iterable] // [1, 3, 5]
[...iterator] // []
```

## supporting combinatorial hight cost functions

Laziness allows to implement combinatorial functions that potentially produces an exponential number of values without consuming them. This library take advantage on that to implement several functions and methods like [combinations](), [permutations](), [variations](), cartesian [product](), cartesian [power]() and [power set]().

Someone can be tempted to implement these functions recursively because it's the most natural implementation. However, this library avoid the recursivity for preventing to overflow the stack.

## thinking about modularity

Sometimes it is not needed to use all features of some library and the enviroments require optimize the size of your scripts. In this case, it is possible to create [customized builds]().

## thinking about performance

Performance is one of the points that this project take into account. However, at the moment the project has focused on implement a large number of functions and methods and ensure their quality. It will be done some optimizations for improving the performace soon. Until now, there are some [benchmarks]() to track the perfomance of `iterum`.
