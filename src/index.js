var IterumBuilder = require('./iterum-builder.js')
var Range = require('./constructors/range.js')
var List = require('./constructors/list.js')
var Repeat = require('./constructors/repeat.js')
var Empty = require('./constructors/empty.js')
var Value = require('./constructors/value.js')
var Cartesian = require('./constructors/cartesian.js')

var build = require('./fn/build')
var concat = require('./fn/concat')
var every = require('./fn/every')
var filter = require('./fn/filter')
var find = require('./fn/find')
var findEntry = require('./fn/findEntry')
var findIndex = require('./fn/findIndex')
var forEach = require('./fn/forEach')
var indexOf = require('./fn/indexOf')
var map = require('./fn/map.js')
var reduce = require('./fn/reduce')
var reduceRight = require('./fn/reduceRight')
var slice = require('./fn/slice')
var some = require('./fn/some')
var toArray = require('./fn/toArray')

var compose = require('./fn/compose')

var Iterum = IterumBuilder({
    constructors: {
        Range: Range,
        List: List,
        Repeat: Repeat,
        Value: Value,
        Empty: Empty,
        Cartesian: Cartesian
    },
    methods: {
        build: build,
        concat: concat,
        every: every,
        filter: filter,
        find: find,
        findEntry: findEntry,
        findIndex: findIndex,
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
