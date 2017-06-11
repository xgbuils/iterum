const Benchmarck = require('benchmark')
const log = require('../log')
const M = require('../../src')
const I = require('imlazy')
const R = require('ramda')

module.exports = function () {
    return new Promise((resolve) => {
        const length = 200
        const start = 20
        const end = 30
        const array = Array.from({length}, (_, i) => i)

        return new Benchmarck.Suite()
        .add('iterum', () => {
            Array.from(M(array).slice(start, end))
        })
        .add('imlazy', () => {
            Array.from(I.slice(start, end, array))
        })
        .add('ramda', () => {
            Array.from(R.slice(start, end, array))
        })
        .add('native', () => {
            array.slice(start, end)
        })
        .on('cycle', x => log(8, `${String(x.target)}\n`, '- '))
        .on('complete', function () {
            log(8, `Fastest is ${this.filter('fastest').map('name')}\n`)
            resolve()
        })
        .run({async: true})
    })
}