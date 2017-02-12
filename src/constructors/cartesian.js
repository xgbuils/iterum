const compose = require('generator.compose')
const Iterable = require('../core/iterable')
const validation = [[Iterable], [Iterable], Infinity]

function* cartesian (...iterables) {
    const Iterum = this
    const generators = iterables.map(function (iterable) {
        return function* (...params) {
            const _ = params[params.length - 1]
            _(...params)
            yield* iterable
        }
    })
    generators.push(function* (...params) {
        yield* Iterum([params.slice(0, -1)])
    })
    const product = compose(...generators)
    yield* product()
}

module.exports = {
    gen: cartesian,
    validation
}
