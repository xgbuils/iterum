const compose = require('../core/reverse-compose')
const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* cartesian (...iterables) {
    const self = this
    const start = function* () {
        for (const val of self) {
            yield [val]
        }
    }
    const generators = iterables.map(function (iterable) {
        return function* (arr) {
            for (const val of iterable) {
                arr.push(val)
                yield arr
                arr.pop()
            }
        }
    })
    const end = function* (arr) {
        yield arr.slice()
    }
    const product = compose(start, ...generators, end)
    yield* product()
}

module.exports = {
    gen: cartesian,
    validation
}
