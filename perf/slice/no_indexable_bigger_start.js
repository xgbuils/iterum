const Benchmarck = require('benchmark')
const log = require('../log')
const traverse = require('../traverse_iterable')
const M = require('../../src')
const I = require('imlazy')

module.exports = function () {
    return new Promise(resolve => {
        const length = 2000
        const start = 1790
        const end = 1800
        const set = new Set(Array.from({length}, (_, i) => i))

        return new Benchmarck.Suite()
        .add('iterum', () => {
            traverse(M(set).slice(start, end))
        })
        .add('imlazy', () => {
            traverse(I.slice(start, end, set))
        })
        .on('cycle', x => log(8, `${String(x.target)}\n`, '- '))
        .on('complete', function () {
            log(8, `Fastest is ${this.filter('fastest').map('name')}\n`)
            resolve()
        })
        .run({async: true})
    })
}
