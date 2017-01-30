var IterumBuilder = require('./factory.js')
var Range = require('./constructors/range.js')
var Cartesian = require('./constructors/cartesian.js')

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
var repeat = require('./fn/repeat')
var slice = require('./fn/slice')
var some = require('./fn/some')

var compose = require('./fn/compose')

var Iterum = IterumBuilder({
    constructors: {
        Range: Range,
        Cartesian: Cartesian
    },
    methods: {
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
        repeat: repeat,
        slice: slice,
        some: some
    }
})

Iterum.compose = compose

module.exports = Iterum
