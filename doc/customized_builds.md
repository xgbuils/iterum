# Customized builds (just import what you need!)

Sometimes production enviroments require to minimize the JavaScript code and avoid to deploy code that is not used. This library is modular and, by the aid of [browserify](https://www.npmjs.com/package/browserify) or [webpack](https://www.npmjs.com/package/webpack) and [src/factory](https://github.com/xgbuils/iterum/blob/master/src/factory.js) function, it is possible to build just the methods that are needed.

For example, if it is only needed `range` static method and `map` and `filter` methods. It is possible to create a customized instance of Iterum, thus:

``` javascript
// customized-iterum.js

const factory = require('iterum/src/factory')
const range = require('iterum/src/range')
const map = require('iterum/src/map')
const filter = require('iterum/src/filter')

const Num = {
    predicate: e => typeof e === 'number',
    type: 'a number'
}
const Iterable = {
    predicate: iterable != null
        && typeof iterable[Symbol.iterator] === 'function',
    type: 'an iterable'
}
const Fn = {
    predicate: f => typeof f === 'function',
    type: 'a function'
}

module.exports = factory({
    staticMethods: {
        range: {
            fn: range,
            validation: [Num, Num]
        }
    },
    methods: {
        map: {
            fn: map,
            validation: [Fn, Iterable]
        },
        filter: {
            fn: filter,
            validation: [Fn, Iterable]
        }
    }
})
```

See [index.js project file](https://github.com/xgbuils/iterum/blob/master/src/index.js) to know how to create a customized `Iterum` class.
