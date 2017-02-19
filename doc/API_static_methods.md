# Static methods

`Iterum` provides static methods for each object method. The behaviour of an static method is related to the object method with the same name. For each object method named `<method>` there is an `Iterum.<method>(iterable, ...args)` that behaves equal than `Iterum(iterable).<method>(...args)`. Also there are some static methods like [range]() that are not related with any object method.

## Iterum.cartesian (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).cartesian(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).cartesian(iterables)`.

See [cartesian method](doc/API_lazy_methods.md#cartesian-iterables)

## Iterum.concat (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).concat(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).concat(iterables)`.

See [concat method](doc/API_lazy_methods.md#concat-iterables)

## Iterum.drop (iterable, n = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).drop(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).drop(n)`.

See [drop method](doc/API_lazy_methods.md#drop-n--1)

## Iterum.dropWhile (iterable, predicate, context = this)

- If `iterable` is iterable, it behaves like `Iterum(iterable).drop(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).drop(predicate, context)`.

See [dropWhile method](doc/API_lazy_methods.md#dropwhile-predicate-context--this)

## Iterum.entries (iterable)

- If `iterable` is iterable, it behaves like `Iterum(iterable).entries()`.
- If `iterable` is not iterable, it behaves like `Iterum([]).entries()`.

See [entries method](doc/API_lazy_methods.md#entries-)

## Iterum.flatten (iterable, depth = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).flatten(depth)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(depth)`.

See [flatten method](doc/API_lazy_methods.md#flatten-depth--1)

## Iterum.filter (iterable, predicate, context = this)

- If `iterable` is iterable, it behaves like `Iterum(iterable).filter(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(predicate, context)`.

See [filter method](doc/API_lazy_methods.md#filter-predicate-context--this)

## Iterum.map (iterable, cb, context = this)

- If `iterable` is iterable, it behaves like `Iterum(iterable).map(cb, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).map(cb, context)`.

See [map method](doc/API_lazy_methods.md#map-cb-context--this)

## Iterum.padEnd (iterable, length = 0, value = undefined)

- If `iterable` is iterable, it behaves like `Iterum(iterable).padEnd(length, value)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).padEnd(length, value)`.

See [padEnd method](doc/API_lazy_methods.md#padend-length--0-value--undefined)

## Iterum.range(start = 0, end = Infinity, step = 1)

Creates an Iterum instance that iterates over values between `start` and `end` value both included with an `step`.

### Usage:
``` javascript
const {range} = require('iterum')

range(2, 7) // potentially [2, 3, 4, 5, 6, 7]
range(0, 25, 5) // potentially [5, 10, 15, 20, 25]
range(4, 10, 4) // potentially [4, 8]
range(1) // potentially [1, 2, 3, 4, ...]
```

## Iterum.repeat(n = Infinity)

- If `iterable` is iterable, it behaves like `Iterum(iterable).repeat(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).repeat(n)`.

See [repeat method](doc/API_lazy_methods.md#repeatn--infinity)

## Iterum.slice (iterable, start = 0, end = Infinity)

- If `iterable` is iterable, it behaves like `Iterum(iterable).slice(start, end)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).slice(start, end)`.

See [slice method](doc/API_lazy_methods.md#slice-start--0-end--infinity)

## Iterum.take (iterable, n = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).take(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).take(n)`.

See [take method](doc/API_lazy_methods.md#take-n--1)

## Iterum.takeWhile (iterable, predicate, context = this)

- If `iterable` is iterable, it behaves like `Iterum(iterable).takeWhile(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).takeWhile(predicate, context)`.

See [takeWhile method](doc/API_lazy_methods.md#takewhile-predicate-context--this)

## Iterum.zip (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).zip(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(iterables)`.

See [zip method](doc/API_lazy_methods.md#zip-iterables)
