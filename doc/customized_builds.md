# Customized builds (just import what you need!)

Sometimes you might need to use this library in a front-end project and, maybe, you might not need to use all of static or object methods that are provided by this library. This is not a problem because this is a modular project and, by the aid of [browserify](https://www.npmjs.com/package/browserify) and `factory` function, you can build just the methods that you need.

For example, if you only need `range` static method and `map` and `filter` methods. You can create your customized instance of Iterum, thus:

``` javascript
// customize-iterum.js

const factory = require('iterum/src/factory')
const range = require('iterum/src/static/range')
const map = require('iterum/src/fn/map')
const filter = require('iterum/src/fn/filter')

module.exports = factory({
    staticMethods: {
        range
    },
    methods: {
        map,
        filter
    }
})
```

See [index.js project file](https://github.com/xgbuils/iterum/blob/master/src/index.js) to know how to create your customized Iterum class.
