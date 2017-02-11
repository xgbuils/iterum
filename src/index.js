const factory = require('./factory')
const range = require('./constructors/range')
const cartesian = require('./constructors/cartesian')
const zip = require('./constructors/zip')

const concat = require('./fn/concat')
const drop = require('./fn/drop')
const dropWhile = require('./fn/dropWhile')
const every = require('./fn/every')
const filter = require('./fn/filter')
const find = require('./fn/find')
const findEntry = require('./fn/findEntry')
const findIndex = require('./fn/findIndex')
const flatten = require('./fn/flatten')
const forEach = require('./fn/forEach')
const indexOf = require('./fn/indexOf')
const map = require('./fn/map.js')
const padEnd = require('./fn/padEnd.js')
const reduce = require('./fn/reduce')
const reduceRight = require('./fn/reduceRight')
const repeat = require('./fn/repeat')
const slice = require('./fn/slice')
const some = require('./fn/some')
const take = require('./fn/take')
const takeWhile = require('./fn/takeWhile')

const Iterum = factory({
    constructors: {
        range,
        cartesian,
        zip
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
        drop,
        dropWhile,
        filter,
        flatten,
        map,
        padEnd,
        repeat,
        slice,
        take,
        takeWhile
    }
})

module.exports = Iterum
