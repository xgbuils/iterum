const factory = require('./factory')
const Iterable = require('./core/iterable')

const combinations = require('./gen/combinations')
const concat = require('./gen/concat')
const dropWhile = require('./gen/dropWhile')
const entries = require('./gen/entries')
const filter = require('./gen/filter')
const flatten = require('./gen/flatten')
const groupBy = require('./gen/groupBy')
const map = require('./gen/map')
const padEnd = require('./gen/padEnd')
const permutations = require('./gen/permutations')
const power = require('./gen/power')
const product = require('./gen/product')
const repeat = require('./gen/repeat')
const takeWhile = require('./gen/takeWhile')
const uniq = require('./gen/uniq')
const uniqBy = require('./gen/uniqBy')
const uniqWith = require('./gen/uniqWith')
const zip = require('./gen/zip')

const drop = require('./fn/drop')
const every = require('./fn/every')
const find = require('./fn/find')
const findEntry = require('./fn/findEntry')
const findIndex = require('./fn/findIndex')
const has = require('./fn/has')
const includes = require('./fn/includes')
const indexOf = require('./fn/indexOf')
const indexOfFrom = require('./fn/indexOfFrom')
const isEmpty = require('is-empty-iterable')
const isEqual = require('./fn/isEqual')
const isEqualBy = require('./fn/isEqualBy')
const isEqualWith = require('./fn/isEqualWith')
const nth = require('./fn/nth')
const range = require('./fn/range')
const rangeByStep = require('./fn/rangeByStep')
const reduce = require('./fn/reduce')
const reduceRight = require('./fn/reduceRight')
const slice = require('./fn/slice')
const some = require('./fn/some')
const take = require('./fn/take')
const transpose = require('./fn/transpose')

const number = ['Number']
const fnc = ['Function']
const infiniteIterablesValidation = [[], [Iterable], Infinity]
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
            gen: concat,
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
            gen: map,
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
            fn: power,
            validation: numberValidation
        },
        product: {
            fn: product,
            validation: infiniteIterablesValidation
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
            gen: repeat,
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
            validation: iterableValidation
        }
    }
})

module.exports = Iterum
