# Iterum constructor

## List (array)
Returns an object that passed to the Iterum constructor, creates a generator that returns iterator that iterates values passed in `array`.

### usage:
``` javascript
var Iterum = require('iterum')
var List = Iterum.List

var generator = Iterum(List([1, 4, 5])).build()

var iterator = generator()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
```

## Range (start, end, [increase = 1])

Returns an object that passed to the Iterum constructor, creates a generator that returns iterator that iterates a range of values based on `start`, `end`, and `increase` parameters.

### usage:

``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var generator = Iterum(Range(0, 6, 2)).build()

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
#### increase : Number
step which increases property `value` for each call of `iterator.next()`.
#### end : Number
value which indicates that `iterator.next()` does not return any value greater than this.


## Value (value)

Returns an object that passed to the Iterum constructor, creates a generator that returns iterator with just one iteration based on `value` passed.

### usage:
``` javascript
var Iterum = require('iterum')
var Value = Iterum.Value

var generator = Iterum(Value(5)).build()

var iterator = generator()
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
iterator.next() // {value: undefined, done: true}
```


## Empty ()

Returns an object that passed to the Iterum constructor, creates a generator that returns iterator that always returns `{value: undefined, done: true}`

### usage:
``` javascript
var Iterum = require('iterum')
var Empty = Iterum.Empty

var generator = Iterum(Empty()).build()

var iterator = generator()
iterator.next() // {value: undefined, done: true}
iterator.next() // {value: undefined, done: true}
```

## Repeat (value, [n = Infinity])

Returns an object that passed to the Iterum constructor, creates a generator that returns iterator that iterates over `value` for `n` times.

### usage:
``` javascript
var Iterum = require('iterum')
var Repeat = Iterum.Repeat

var generator = Iterum(Repeat(5)).build()

var iterator = generator()
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
iterator.next() // {value: undefined, done: true}
```

## functions (customized generators)

Also it is possible to create customized generators passing a generator function as parameter.

### usage:

``` javascript
var Iterum = require('iterum')

function fibonacci () {
    var count = 0
    var a = 0
    var b = 1
    return function () {
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

var generator = Iterum(fibonacci(n)).build()

var iterator = generator()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: 8, done: false}
// ...
```

#### Using generators with parameters:

Iterum constructor consider that the generator passed does not have arguments. If you want to pass a generator to Iterum constructor using parameters it is needed to specify its arguments and Iterum bind the generator function with them:

``` javascript
function myGeneratorWithParams (prefix) {
    return {
        next: function () {
            return {
                value: prefix + 'foobar'
                done: false
            }
        }
    }
}

var generator = Iterum(myGeneratorWithParams, 'fizzbuzz-')

var iterator = generator()
iterator.next() // {value: 'fizzbuzz-foobar', done: false}
iterator.next() // {value: 'fizzbuzz-foobar', done: false}
iterator.next() // {value: 'fizzbuzz-foobar', done: false}
iterator.next() // {value: 'fizzbuzz-foobar', done: false}
// ...
```