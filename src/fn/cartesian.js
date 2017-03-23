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
                yield [...arr, val]
            }
        }
    }).reverse()
    const product = compose(...generators, firstGenerator)
    yield* product()
}

module.exports = {
    gen: cartesian,
    validation
}
