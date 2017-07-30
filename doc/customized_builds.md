# Customized builds (just import what you need!)

Sometimes you might need to use this library in a front-end project and, maybe, you might not need to use all of functions or methods that are provided by this library. This is not a problem because this is a modular project and, by the aid of [browserify](https://www.npmjs.com/package/browserify) or [webpack](https://www.npmjs.com/package/webpack) and `src/factory` function, you can build just the methods that you need.

For example, if you only need `range` static method and `map` and `filter` methods. You can create your customized instance of Iterum, thus:

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

See [index.js project file](https://github.com/xgbuils/iterum/blob/master/src/index.js) to know how to create your customized Iterum class.
