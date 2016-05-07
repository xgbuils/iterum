# Static Functions

## Iterum.compose (...generators)

A generator is a function that returns an iterator. Then, given a list of generators as parameters, `Iterum.compose` returns a new generator that is the composition of its.

### Examples:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var gen = Iterum.compose(
    return Iterum(Range(1, 3)).build(),
    return Iterum(Range(5, 1, -2)).build()
)

Iterum(gen).toArray() // [5, 3, 1, 5, 3, 1, 5, 3, 1]
```

You can create a parametrizable generator defining the first generator with parameters:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var gen = Iterum.compose(
    function (n) {
        return Iterum(Range(1, n)).build()()
    },
    function () {
        return Iterum(Range(5, 1, -2)).build()()
    }
)

Iterum(gen, 2)
    .toArray() // [5, 3, 1, 5, 3, 1]

Iterum(gen, 5)
    .toArray() // [5, 3, 1, 5, 3, 1, 5, 3, 1, 5, 3, 1, 5, 3, 1]
```

You can pass parameters to the next generator using extra parameter callback:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range

var gen = Iterum.compose(
    function (n, _) {
        _(n)
        return Iterum(Range(1, n)).build()()
    },
    function (n) {
        return Iterum(Range(1, n)).build()()
    }
)

Iterum(gen, 2)
    .toArray() // [1, 2, 1, 2]

Iterum(gen, 3)
    .toArray() // [1, 2, 3, 1, 2, 3, 1, 2, 3]
```

When extra parameter callback is self passed as parameter, next generator callback receives the value equivalent to previous iterator#next().value:
``` javascript
var Iterum = require('iterum')
var Range = Iterum.Range
var Value = Iterum.Value

var generator = Iterum.compose(
    function (n, _) {
        _(_, n)
        return Iterum(Range(0, n)).build()()
    },
    function (i, n, _) {
        _(i, _, n)
        return Iterum(Range(0, n)).build()()
    },
    function (i, j, n, _) {
        _(i, j, _)
        return Iterum(Range(0, n)).build()()
    },
    function (i, j, k) {
        return Iterum(Value([i, j, k])).build()()
    }
)

Iterum(generator, 2)
    .toArray() /* [
    [ 0, 0, 0 ],  [ 0, 0, 1 ],  [ 0, 0, 2 ],
    [ 0, 1, 0 ],  [ 0, 1, 1 ],  [ 0, 1, 2 ],
    [ 0, 2, 0 ],  [ 0, 2, 1 ],  [ 0, 2, 2 ],
    [ 1, 0, 0 ],  [ 1, 0, 1 ],  [ 1, 0, 2 ],
    [ 1, 1, 0 ],  [ 1, 1, 1 ],  [ 1, 1, 2 ],
    [ 1, 2, 0 ],  [ 1, 2, 1 ],  [ 1, 2, 2 ],
    [ 2, 0, 0 ],  [ 2, 0, 1 ],  [ 2, 0, 2 ],
    [ 2, 1, 0 ],  [ 2, 1, 1 ],  [ 2, 1, 2 ],
    [ 2, 2, 0 ],  [ 2, 2, 1 ],  [ 2, 2, 2 ]
]*/
```
