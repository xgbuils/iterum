const Benchmarck = require('benchmark')
const log = require('../log')

module.exports = function () {
    return new Promise(resolve => {
        const length = 100
        const iterable = Array.from({length}, (_, i) => i)

        return new Benchmarck.Suite()
            .add('for of', () => {
                forOf(iterable)
            })
            .add('using iterator', () => {
                byIterator(iterable)
            })
            .add('spread operator', () => {
                spreadOperator(iterable)
            })
            .add('Array.from', () => {
                arrayFrom(iterable)
            })
            .add('new Set', () => {
                toSet(iterable)
            })
            .on('cycle', x => log(8, `${String(x.target)}\n`, '- '))
            .on('complete', function () {
                log(8, `Fastest is ${this.filter('fastest').map('name')}\n`)
                resolve()
            })
            .run({async: true})
    })
}

function forOf (iterable) {
    for (const val of iterable) {} // eslint-disable-line no-unused-vars
}

function byIterator (iterable) {
    const iterator = iterable[Symbol.iterator]()
    while (!iterator.next().done) {}
}

function spreadOperator (iterable) {
    [...iterable] // eslint-disable-line no-unused-expressions
}

function arrayFrom (iterable) {
    Array.from(iterable)
}

function toSet (iterable) {
    new Set(iterable) // eslint-disable-line no-new
}
