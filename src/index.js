var IterumBuilder = require('./iterum-builder.js')
var Range = require('./constructors/range.js')
var List = require('./constructors/list.js')
var Repeat = require('./constructors/repeat.js')
var Empty = require('./constructors/empty.js')
var Value = require('./constructors/value.js')

var build = require('./fn/build.js')
var concat = require('./fn/concat.js')
var filter = require('./fn/filter.js')
var map = require('./fn/map.js')
var slice = require('./fn/slice.js')
var indexOf = require('./fn/indexOf.js')
var some = require('./fn/some.js')
var every = require('./fn/every.js')
var toArray = require('./fn/toArray.js')

var compose = require('./fn/compose')

var Iterum = IterumBuilder({
    constructors: {
        Range: Range,
        List: List,
        Repeat: Repeat,
        Value: Value,
        Empty: Empty
    },
    methods: {
        build: build,
        concat: concat,
        every: every,
        filter: filter,
        indexOf: indexOf,
        map: map,
        slice: slice,
        some: some,
        toArray: toArray
    }
})

Iterum.compose = compose

module.exports = Iterum
