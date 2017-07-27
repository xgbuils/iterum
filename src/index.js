const factory = require('./factory')
const isIterable = require('./internal/isIterable')

const chunk = require('./chunk')
const combinations = require('./combinations')
const concat = require('./concat')
const cycle = require('./cycle')
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
const powerSet = require('./powerSet')
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
const tap = require('./tap')
const toString = require('./toString')
const transpose = require('./transpose')
const transposeLongest = require('./transposeLongest')
const uniq = require('./uniq')
const uniqBy = require('./uniqBy')
const uniqWith = require('./uniqWith')
const variations = require('./variations')
const zip = require('./zip')
const zipLongest = require('./zipLongest')

const Num = {
    predicate: n => ({}).toString.call(n).slice(8, -1) === 'Number',
    type: 'a number'
}
const Fn = {
    predicate: f => typeof f === 'function',
    type: 'a function'
}
const Iterable = {
    predicate: isIterable,
    type: 'an iterable'
}
const Any = {
    predicate: () => true
}
const functionValidation = [Fn, Iterable]
const reduceValidation = [Fn, Any, Iterable]
const numberValidation = [Num, Iterable]
const iterableValidation = [Iterable]
const anyValueValidation = [Any, Iterable]
const twoIterableValidation = [Iterable, Iterable]
const twoNumberValidation = [Num, Num, Iterable]

const Iterum = factory({
    staticMethods: {
        range: {
            fn: range,
            validation: [Num, Num]
        },
        rangeByStep: {
            fn: rangeByStep,
            validation: [Num, Num, Num]
        }
    },
    methods: {
        chunk: {
            fn: chunk,
            validation: numberValidation
        },
        combinations: {
            fn: combinations,
            validation: numberValidation
        },
        concat: {
            fn: concat,
            validation: twoIterableValidation,
            binary: true
        },
        cycle: {
            fn: cycle,
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
            fn: entries,
            validation: iterableValidation
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
            validation: anyValueValidation
        },
        indexOf: {
            fn: indexOf,
            validation: anyValueValidation
        },
        indexOfFrom: {
            fn: indexOfFrom,
            validation: [Any, Num, Iterable]
        },
        isEmpty: {
            fn: isEmpty,
            validation: iterableValidation
        },
        isEqual: {
            fn: isEqual,
            validation: [Any, Any]
        },
        isEqualBy: {
            fn: isEqualBy,
            validation: [Fn, Any, Any]
        },
        isEqualWith: {
            fn: isEqualWith,
            validation: [Fn, Any, Any]
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
            validation: [Num, Any, Iterable]
        },
        permutations: {
            fn: permutations,
            validation: iterableValidation
        },
        power: {
            fn: power,
            validation: numberValidation
        },
        powerSet: {
            fn: powerSet,
            validation: iterableValidation
        },
        product: {
            fn: product,
            validation: iterableValidation
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
        tap: {
            fn: tap,
            validation: functionValidation
        },
        toString: {
            fn: toString,
            validation: iterableValidation
        },
        transpose: {
            fn: transpose,
            validation: iterableValidation
        },
        transposeLongest: {
            fn: transposeLongest,
            validation: iterableValidation
        },
        uniq: {
            fn: uniq,
            validation: iterableValidation
        },
        uniqBy: {
            fn: uniqBy,
            validation: functionValidation
        },
        uniqWith: {
            fn: uniqWith,
            validation: functionValidation
        },
        variations: {
            fn: variations,
            validation: numberValidation
        },
        zip: {
            fn: zip,
            validation: twoIterableValidation,
            binary: true
        },
        zipLongest: {
            fn: zipLongest,
            validation: twoIterableValidation,
            binary: true
        }
    }
})

module.exports = Iterum
