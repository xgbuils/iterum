const isEmpty = require('is-empty-iterable')
const range = require('./range')
const map = require('./map')
const takeWhile = require('./takeWhile')

module.exports = function* groupBy (iterable, cb = e => e) {
    const array = []
    const groups = new Map()
    const IterumConstructor = this
    const iterator = iterable[Symbol.iterator]()
    const rangeIterable = range(0, Infinity)
    const mapIterable = map(rangeIterable, function (index) {
        return IterumConstructor(function* () {
            let start = 0
            while (true) {
                while (array.length <= index || groups.get(array[index]).length <= start) {
                    const {value, done} = iterator.next()
                    if (done) {
                        return
                    }
                    const key = cb(value)
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
    })
    yield * takeWhile(mapIterable, e => !isEmpty(e))
}
