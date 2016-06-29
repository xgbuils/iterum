# Iterum constructors

## Iterum (generator, ...boundParams)

Given a `generator` parameter, it returns an `Iterum` instance that wraps this `generator`. It is possible to pass a generator with arguments, but Iterum instance will wrap a generator with 0-arity. If you want to bind this arguments with generator, `Iterum` constructor allows to receive extra parameters that are bound to `generator` param

### usage:

``` javascript
var Iterum = require('iterum')

function fibonacciUntil (n) {
    var count = 0
    var a = 0
    var b = 1
    return {
        next: function () {
            var done = count >= n
            var nextValue = a + b
            a = b
            b = nextValue
            ++count
            return {
                value: done ? undefined : a,
                done: done
            }
        }
    }
}

var generator = Iterum(fibonacciUntil, 6).build()

var iterator = generator()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: 8, done: false}
iterator.next() // {value: undefined, done: true}
// ...
```

## List (array)
Returns an Iterum instance that wraps a generator that returns an iterator that iterates values passed in `array` parameter.

### usage:
``` javascript
var Iterum = require('iterum')
var List = Iterum.List

var generator = List([1, 4, 5]).build()

var iterator = generator()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
```

## Range (start, end, [increment = 1])

Returns an Iterum instance that wraps a generator which returns an iterator that iterates a range of values based on `start`, `end`, and `increment` parameters.

### usage:

``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Range(0, 6, 2).build()

var iterator = generator()
iterator.next() // {value: 0, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 6, done: false}
iterator.next() // {value: undefined, done: true}
```

### params:
#### start : Number
value of property `value` returned by first call of `iterator.next()`.
#### increment : Number
step which increases property `value` for each call of `iterator.next()`.
#### end : Number
value which indicates that `iterator.next()` does not return any value greater than this.


## Value (value)

Returns an Iterum instance that wraps a generator that returns an iterator with just one iteration based on `value` passed.

### usage:
``` javascript
var Iterum = require('iterum')
var Value = Iterum.Value

var generator = Value(5).build()

var iterator = generator()
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
iterator.next() // {value: undefined, done: true}
```


## Empty ()

Returns an Iterum instance that wraps a generator that returns an iterator that always returns `{value: undefined, done: true}`

### usage:
``` javascript
var Iterum = require('iterum')
var Empty = Iterum.Empty

var generator = Empty().build()

var iterator = generator()
iterator.next() // {value: undefined, done: true}
iterator.next() // {value: undefined, done: true}
```

## Repeat (value, [n = Infinity])

Returns an Iterum instance that wraps a generator that returns an iterator that iterates over `value` for `n` times. Default value of `n` is Infinity.

### usage:
``` javascript
var Iterum = require('iterum')
var Repeat = Iterum.Repeat

var generator = Iterum(Repeat(5)).build()

var iterator = generator()
iterator.next() // {value: 5, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: 5, done: false}
// ...
```
