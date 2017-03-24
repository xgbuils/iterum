const compose = require('generator.compose')
const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* cartesian (...iterables) {
    const self = this
    const firstGenerator = function* () {
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
    }).reverse()
    const end = function* (arr) {
        yield arr.slice()
    }
    const product = compose(end, ...generators, firstGenerator)
    yield* product()
}

module.exports = {
    gen: cartesian,
    validation
}
