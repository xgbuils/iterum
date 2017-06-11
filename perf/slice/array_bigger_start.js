const Benchmarck = require('benchmark')
const log = require('../log')
const traverse = require('../traverse_iterable')
const M = require('../../src')
const I = require('imlazy')
const R = require('ramda')

module.exports = function () {
    return new Promise(resolve => {
        const length = 2000
        const start = 1790
        const end = 1800
        const array = Array.from({length}, (_, i) => i)

        return new Benchmarck.Suite()
        .add('iterum', () => {
            traverse(M(array).slice(start, end))
        })
        .add('imlazy', () => {
            traverse(I.slice(start, end, array))
        })
        .add('ramda', () => {
            traverse(R.slice(start, end, array))
        })
        .add('native', () => {
            traverse(array.slice(start, end))
        })
        .on('cycle', x => log(8, `${String(x.target)}\n`, '- '))
        .on('complete', function () {
            log(8, `Fastest is ${this.filter('fastest').map('name')}\n`)
            resolve()
        })
        .run({async: true})
    })
}
