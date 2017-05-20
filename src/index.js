const factory = require('./factory')
const Iterable = require('./core/iterable')

const concat = require('./gen/concat')
const drop = require('./gen/drop')
const dropWhile = require('./gen/dropWhile')
const entries = require('./gen/entries')
const filter = require('./gen/filter')
const flatten = require('./gen/flatten')
const groupBy = require('./gen/groupBy')
const map = require('./gen/map')
const padEnd = require('./gen/padEnd')
const permutations = require('./gen/permutations')
const product = require('./gen/product')
const range = require('./gen/range')
const repeat = require('./gen/repeat')
const slice = require('./gen/slice')
const take = require('./gen/take')
const takeWhile = require('./gen/takeWhile')
const uniq = require('./gen/uniq')
const uniqBy = require('./gen/uniqBy')
const uniqWith = require('./gen/uniqWith')
const zip = require('./gen/zip')

const every = require('./fn/every')
const find = require('./fn/find')
const findEntry = require('./fn/findEntry')
const findIndex = require('./fn/findIndex')
const forEach = require('./fn/forEach')
const includes = require('./fn/includes')
const indexOf = require('./fn/indexOf')
const isEmpty = require('is-empty-iterable')
const isEqual = require('./fn/isEqual')
const isEqualBy = require('./fn/isEqualBy')
const isEqualWith = require('./fn/isEqualWith')
const reduce = require('./fn/reduce')
const reduceRight = require('./fn/reduceRight')
const some = require('./fn/some')

const optionalNumber = ['Number', 'Undefined']
const infiniteIterablesValidation = [[], [Iterable], Infinity]
const functionValidation = [[], ['Function']]
const optionalNumberValidation = [[], optionalNumber]

const Iterum = factory({
    staticMethods: {
        range: {
            gen: range,
            validation: [optionalNumber, optionalNumber, optionalNumber]
        }
    },
    methods: {
        concat: {
            gen: concat,
            validation: infiniteIterablesValidation
        },
        drop: {
            gen: drop,
            validation: optionalNumberValidation
        },
        dropWhile: {
            gen: dropWhile,
            validation: functionValidation
        },
        entries: {
            gen: entries
        },
        every: {
            fn: every,
            validation: functionValidation
        },
        filter: {
            gen: filter,
            validation: functionValidation
        },
        find: {
            fn: find,
            validation: functionValidation
        },
        findEntry: {
            fn: findEntry,
            validation: functionValidation
        },
        findIndex: {
            fn: findIndex,
            validation: functionValidation
        },
        flatten: {
            gen: flatten,
            validation: optionalNumberValidation
        },
        forEach: {
            fn: forEach
        },
        includes: {
            fn: includes
        },
        indexOf: {
            fn: indexOf
        },
        isEmpty: {
            fn: isEmpty
        },
        isEqual: {
            fn: isEqual,
            validation: [[], [Iterable]]
        },
        isEqualBy: {
            fn: isEqualBy,
            validation: [[], [Iterable], ['Function']]
        },
        isEqualWith: {
            fn: isEqualWith,
            validation: [[], [Iterable], ['Function']]
        },
        map: {
            gen: map,
            validation: functionValidation
        },
        groupBy: {
            gen: groupBy,
            validation: functionValidation
        },
        padEnd: {
            gen: padEnd,
            validation: optionalNumberValidation
        },
        permutations: {
            gen: permutations
        },
        product: {
            gen: product,
            validation: infiniteIterablesValidation
        },
        reduce: {
            fn: reduce
        },
        reduceRight: {
            fn: reduceRight
        },
        repeat: {
            gen: repeat,
            validation: optionalNumberValidation
        },
        slice: {
            gen: slice,
            validation: [[], optionalNumber, optionalNumber]
        },
        some: {
            fn: some,
            validation: functionValidation
        },
        take: {
            gen: take,
            validation: optionalNumberValidation
        },
        takeWhile: {
            gen: takeWhile,
            validation: functionValidation
        },
        uniq: {
            gen: uniq
        },
        uniqBy: {
            gen: uniqBy,
            validation: functionValidation
        },
        uniqWith: {
            gen: uniqWith,
            validation: functionValidation
        },
        zip: {
            gen: zip,
            validation: infiniteIterablesValidation
        }
    }
})

module.exports = Iterum
