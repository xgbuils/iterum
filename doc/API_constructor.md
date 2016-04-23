# Iterum constructor

## Function

It is possible to create iterator passing function as parameter that represents the `next` iterator method.

### usage:
``` javascript
var Iterum = require('iterum')

var iterator = new Iterum(fibonacci())

function fibonacci () {
    var count = 0
    var a = 0
    var b = 1
    return function () {
        var done = count >= 8
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

iterator.next() // {value: 1, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: 8, done: false}
// ...
```

## Value (value)

Function for creating iterator which just returns a value indicated by parameter `value`. Then it always returns `{value: undefined, done: true}`.

### usage:
``` javascript
var Iterum = require('iterum')
var Value = Iterum.Value

var iterator = new Iterum(Value(5))

iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
```

## List (array)
Function for creating iterator which returns values specificated in parameter `array`.

### usage:
``` javascript
var Iterum = require('iterum')
var List = Iterum.List

var iterator = Iterum(List([1, 4, 5]))

iterator.next() // {value: 1, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}
```

## Range (start, end, increase)

Function for creating iterator which returns a range iterator based on `start`, `end`, and `increase` parameters

### usage:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var iterator = Iterum(Range(0, 6, 2))

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
