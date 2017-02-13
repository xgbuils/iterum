const compose = require('generator.compose')
const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* cartesian (...iterables) {
    const iterableList = [this, ...iterables]
    const generators = iterableList.map(function (iterable) {
        return function* (...params) {
            const _ = params[params.length - 1]
            _(...params)
            yield* iterable
        }
    })
    generators.push(function* (...params) {
        yield params.slice(0, -1)
    })
    const product = compose(...generators)
    yield* product()
}

module.exports = {
    gen: cartesian,
    validation
}
