const isEmpty = require('is-empty-iterable')
const baseRange = require('../internal/baseRange')
const mapGen = require('../internal/mapGen')
const takeWhileGen = require('./takeWhileGen')

module.exports = function groupBy (iterable, cb) {
    const array = []
    const groups = new Map()
    const IterumConstructor = this
    const iterator = iterable[Symbol.iterator]()
    let n = 0
    const naturals = baseRange(0, Infinity)
    const mapIterable = mapGen(function (index) {
        return IterumConstructor(function* () {
            let start = 0
            while (true) {
                while (array.length <= index || groups.get(array[index]).length <= start) {
                    const {value, done} = iterator.next()
                    if (done) {
                        return
                    }
                    const key = cb(value, n++)
                    if (!groups.has(key)) {
                        array.push(key)
                        groups.set(key, [value])
                    } else {
                        groups.get(key).push(value)
                    }
                }
                yield groups.get(array[index])[start]
                ++start
            }
        })
    }, naturals)
    return takeWhileGen(mapIterable, e => !isEmpty(e))
}
