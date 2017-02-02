const factory = require('./factory.js')
const Range = require('./constructors/range.js')
const Cartesian = require('./constructors/cartesian.js')

const concat = require('./fn/concat')
const every = require('./fn/every')
const filter = require('./fn/filter')
const find = require('./fn/find')
const findEntry = require('./fn/findEntry')
const findIndex = require('./fn/findIndex')
const forEach = require('./fn/forEach')
const indexOf = require('./fn/indexOf')
const map = require('./fn/map.js')
const reduce = require('./fn/reduce')
const reduceRight = require('./fn/reduceRight')
const repeat = require('./fn/repeat')
const slice = require('./fn/slice')
const some = require('./fn/some')

const compose = require('./fn/compose')

const Iterum = factory({
    constructors: {
        Range,
        Cartesian
    },
    eagerMethods: {
        every,
        find,
        findEntry,
        findIndex,
        forEach,
        indexOf,
        reduce,
        reduceRight,
        some
    },
    lazyMethods: {
        concat,
        filter,
        map,
        repeat,
        slice
    }
})

Iterum.compose = compose

module.exports = Iterum
