# Static methods

`Iterum` provides static methods for each object method. The behaviour of an static method is related to the object method with the same name. For each object method named `<method>` there is an `Iterum.<method>(iterable, ...args)` that behaves equal than `Iterum(iterable).<method>(...args)`. Also there are some static methods like [range]() that are not related with any object method.

## Iterum.cartesian (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).cartesian(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).cartesian(iterables)`.

See [cartesian method](API_object_methods.md#cartesian-iterables)

## Iterum.concat (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).concat(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).concat(iterables)`.

See [concat method](API_object_methods.md#concat-iterables)

## Iterum.drop (iterable, n = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).drop(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).drop(n)`.

See [drop method](API_object_methods.md#drop-n--1)

## Iterum.dropWhile (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).drop(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).drop(predicate, context)`.

See [dropWhile method](API_object_methods.md#dropwhile-predicate-context--this)

## Iterum.entries (iterable)

- If `iterable` is iterable, it behaves like `Iterum(iterable).entries()`.
- If `iterable` is not iterable, it behaves like `Iterum([]).entries()`.

See [entries method](API_object_methods.md#entries-)

## Iterum.every (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).every(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).every(predicate, context)`.

See [every method](API_object_methods.md#every-predicate-context--this)

## Iterum.filter (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).filter(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(predicate, context)`.

See [filter method](API_object_methods.md#filter-predicate-context--this)

## Iterum.find (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).find(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).find(predicate, context)`.

See [find method](API_object_methods.md#find-predicate-context--this)

## Iterum.findEntry (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).findEntry(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).findEntry(predicate, context)`.

See [findEntry method](API_object_methods.md#findentry-predicate-context--this)

## Iterum.findIndex (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).findIndex(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).findIndex(predicate, context)`.

See [findIndex method](API_object_methods.md#findindex-predicate-context--this)

## Iterum.flatten (iterable, depth = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).flatten(depth)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(depth)`.

See [flatten method](API_object_methods.md#flatten-depth--1)

## Iterum.forEach (iterable, cb, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).forEach(cb, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).forEach(cb, context)`.

See [forEach method](API_object_methods.md#foreach-cb-context)

## Iterum.includes (iterable, value, fromIndex = 0)

- If `iterable` is iterable, it behaves like `Iterum(iterable).includes(value, fromIndex)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).includes(value, fromIndex)`.

See [includes method](API_object_methods.md#includes-value-fromindex--0)

## Iterum.indexOf (iterable, value, fromIndex = 0)

- If `iterable` is iterable, it behaves like `Iterum(iterable).indexOf(value, fromIndex)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).indexOf(value, fromIndex)`.

See [indexOf method](API_object_methods.md#indexof-value-fromindex--0)

## Iterum.map (iterable, cb, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).map(cb, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).map(cb, context)`.

See [map method](API_object_methods.md#map-cb-context--this)

## Iterum.padEnd (iterable, length = 0, value = undefined)

- If `iterable` is iterable, it behaves like `Iterum(iterable).padEnd(length, value)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).padEnd(length, value)`.

See [padEnd method](API_object_methods.md#padend-length--0-value--undefined)

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


See [map method](API_object_methods.md#map-cb-context--this)

## Iterum.reduce (iterable, callback, initialValue)

- If `iterable` is iterable, it behaves like `Iterum(iterable).reduce(callback, initialValue)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).reduce(callback, initialValue)`.

See [reduce method](API_object_methods.md#reduce-cb-initialvalue)

## Iterum.reduceRight (iterable, callback, initialValue)

- If `iterable` is iterable, it behaves like `Iterum(iterable).reduceRight(callback, initialValue)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).reduceRight(callback, initialValue)`.

See [reduceRight method](API_object_methods.md#reduceright-cb-initialvalue)

## Iterum.repeat(iterable, n = Infinity)

- If `iterable` is iterable, it behaves like `Iterum(iterable).repeat(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).repeat(n)`.

See [repeat method](API_object_methods.md#repeatn--infinity)

## Iterum.slice (iterable, start = 0, end = Infinity)

- If `iterable` is iterable, it behaves like `Iterum(iterable).slice(start, end)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).slice(start, end)`.

See [slice method](API_object_methods.md#slice-start--0-end--infinity)

## Iterum.some (iterable, callback, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).some(callback, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).some(callback, context)`.

See [some method](API_object_methods.md#some-predicate-context--this)

## Iterum.take (iterable, n = 1)

- If `iterable` is iterable, it behaves like `Iterum(iterable).take(n)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).take(n)`.

See [take method](API_object_methods.md#take-n--1)

## Iterum.takeWhile (iterable, predicate, context)

- If `iterable` is iterable, it behaves like `Iterum(iterable).takeWhile(predicate, context)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).takeWhile(predicate, context)`.

See [takeWhile method](API_object_methods.md#takewhile-predicate-context--this)

## Iterum.zip (iterable, ...iterables)

- If `iterable` is iterable, it behaves like `Iterum(iterable).zip(iterables)`.
- If `iterable` is not iterable, it behaves like `Iterum([]).flatten(iterables)`.

See [zip method](API_object_methods.md#zip-iterables)
