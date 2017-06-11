const Benchmarck = require('benchmark')
const log = require('../log')
const M = require('../../src')
const I = require('imlazy')

module.exports = function () {
    return new Promise(resolve => {
        const length = 200
        const start = 20
        const end = 30
        const set = new Set(Array.from({length}, (_, i) => i))

        return new Benchmarck.Suite()
        .add('iterum', () => {
            Array.from(M(set).slice(start, end))
        })
        .add('imlazy', () => {
            Array.from(I.slice(start, end, set))
        })
        .on('cycle', x => log(8, `${String(x.target)}\n`, '- '))
        .on('complete', function () {
            log(8, `Fastest is ${this.filter('fastest').map('name')}\n`)
            resolve()
        })
        .run({async: true})
    })
}
