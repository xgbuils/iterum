const factory = require('./factory')
const Iterable = require('./internal/iterable')

const combinations = require('./combinations')
const concat = require('./concat')
const drop = require('./drop')
const dropWhile = require('./dropWhile')
const entries = require('./entries')
const every = require('./every')
const filter = require('./filter')
const find = require('./find')
const findEntry = require('./findEntry')
const findIndex = require('./findIndex')
const flatten = require('./flatten')
const groupBy = require('./groupBy')
const has = require('./has')
const includes = require('./includes')
const indexOf = require('./indexOf')
const indexOfFrom = require('./indexOfFrom')
const isEmpty = require('is-empty-iterable')
const isEqual = require('./isEqual')
const isEqualBy = require('./isEqualBy')
const isEqualWith = require('./isEqualWith')
const map = require('./map')
const nth = require('./nth')
const padEnd = require('./padEnd')
const permutations = require('./permutations')
const power = require('./power')
const product = require('./product')
const range = require('./range')
const rangeByStep = require('./rangeByStep')
const reduce = require('./reduce')
const reduceRight = require('./reduceRight')
const repeat = require('./repeat')
const slice = require('./slice')
const some = require('./some')
const take = require('./take')
const takeWhile = require('./takeWhile')
const transpose = require('./transpose')
const uniq = require('./uniq')
const uniqBy = require('./uniqBy')
const uniqWith = require('./uniqWith')
const zip = require('./zip')

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
            fn: combinations,
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
            fn: dropWhile,
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
            fn: filter,
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
            fn: groupBy,
            validation: functionValidation
        },
        padEnd: {
            fn: padEnd,
            validation: [[], number, []]
        },
        permutations: {
            fn: permutations
        },
        power: {
            fn: power,
            validation: numberValidation
        },
        product: {
            fn: product
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
            fn: takeWhile,
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
