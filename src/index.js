var IterumBuilder = require('./iterum-builder.js')
var Range = require('./constructors/range.js')
var List = require('./constructors/list.js')
var Repeat = require('./constructors/repeat.js')
var Empty = require('./constructors/empty.js')
var Value = require('./constructors/value.js')

var build = require('./fn/build.js')
var concat = require('./fn/concat.js')
var every = require('./fn/every.js')
var filter = require('./fn/filter.js')
var forEach = require('./fn/forEach.js')
var indexOf = require('./fn/indexOf.js')
var map = require('./fn/map.js')
var reduce = require('./fn/reduce.js')
var reduceRight = require('./fn/reduceRight.js')
var slice = require('./fn/slice.js')
var some = require('./fn/some.js')
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
        forEach: forEach,
        indexOf: indexOf,
        map: map,
        reduce: reduce,
        reduceRight: reduceRight,
        slice: slice,
        some: some,
        toArray: toArray
    }
})

Iterum.compose = compose

module.exports = Iterum
