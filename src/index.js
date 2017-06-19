const factory = require('./factory')
const Iterable = require('./core/iterable')

const combinations = require('./gen/combinations')
const dropWhile = require('./gen/dropWhile')
const filter = require('./gen/filter')
const groupBy = require('./gen/groupBy')
const padEnd = require('./gen/padEnd')
const permutations = require('./gen/permutations')
const takeWhile = require('./gen/takeWhile')

const concat = require('./fn/concat')
const drop = require('./fn/drop')
const entries = require('./fn/entries')
const every = require('./fn/every')
const find = require('./fn/find')
const findEntry = require('./fn/findEntry')
const findIndex = require('./fn/findIndex')
const flatten = require('./fn/flatten')
const has = require('./fn/has')
const includes = require('./fn/includes')
const indexOf = require('./fn/indexOf')
const indexOfFrom = require('./fn/indexOfFrom')
const isEmpty = require('is-empty-iterable')
const isEqual = require('./fn/isEqual')
const isEqualBy = require('./fn/isEqualBy')
const isEqualWith = require('./fn/isEqualWith')
const map = require('./fn/map')
const nth = require('./fn/nth')
const power = require('./fn/power')
const product = require('./fn/product')
const range = require('./fn/range')
const rangeByStep = require('./fn/rangeByStep')
const reduce = require('./fn/reduce')
const reduceRight = require('./fn/reduceRight')
const repeat = require('./fn/repeat')
const slice = require('./fn/slice')
const some = require('./fn/some')
const take = require('./fn/take')
const transpose = require('./fn/transpose')
const uniq = require('./fn/uniq')
const uniqBy = require('./fn/uniqBy')
const uniqWith = require('./fn/uniqWith')
const zip = require('./fn/zip')

const number = ['Number']
const fnc = ['Function']
const functionValidation = [[], fnc]
const reduceValidation = [[], fnc, []]
const numberValidation = [[], number]
const iterableValidation = [[], [Iterable]]
const twoNumberValidation = [[], number, number]

const Iterum = factory({
    staticMethods: {
        range: {
            fn: range,
            validation: [number, number]
        },
        rangeByStep: {
            fn: rangeByStep,
            validation: [number, number, number]
        }
    },
    methods: {
        combinations: {
            gen: combinations,
            validation: numberValidation
        },
        concat: {
            fn: concat,
            validation: iterableValidation
        },
        drop: {
            fn: drop,
            validation: numberValidation
        },
        dropWhile: {
            gen: dropWhile,
            validation: functionValidation
        },
        entries: {
            fn: entries
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
            fn: flatten,
            validation: numberValidation
        },
        has: {
            fn: has,
            validation: numberValidation
        },
        includes: {
            fn: includes,
            validation: [[], []]
        },
        indexOf: {
            fn: indexOf,
            validation: [[], []]
        },
        indexOfFrom: {
            fn: indexOfFrom,
            validation: [[], [], number]
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
            fn: map,
            validation: functionValidation
        },
        nth: {
            fn: nth,
            validation: numberValidation
        },
        groupBy: {
            gen: groupBy,
            validation: functionValidation
        },
        padEnd: {
            gen: padEnd,
            validation: [[], number, []]
        },
        permutations: {
            gen: permutations
        },
        power: {
            gen: power,
            validation: numberValidation
        },
        product: {
            gen: product
        },
        reduce: {
            fn: reduce,
            validation: reduceValidation
        },
        reduceRight: {
            fn: reduceRight,
            validation: reduceValidation
        },
        repeat: {
            fn: repeat,
            validation: numberValidation
        },
        slice: {
            fn: slice,
            validation: twoNumberValidation
        },
        some: {
            fn: some,
            validation: functionValidation
        },
        take: {
            fn: take,
            validation: numberValidation
        },
        takeWhile: {
            gen: takeWhile,
            validation: functionValidation
        },
        transpose: {
            fn: transpose
        },
        uniq: {
            fn: uniq
        },
        uniqBy: {
            fn: uniqBy,
            validation: functionValidation
        },
        uniqWith: {
            fn: uniqWith,
            validation: functionValidation
        },
        zip: {
            fn: zip,
            validation: iterableValidation
        }
    }
})

module.exports = Iterum
