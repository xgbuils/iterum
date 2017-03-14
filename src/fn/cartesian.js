const compose = require('generator.compose')
const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* cartesian (...iterables) {
    const self = this
    const firstGenerator = function* (_) {
        _([], _)
        yield* self
    }
    const generators = iterables.map(function (iterable) {
        return function* (params, value, _) {
            _([...params, value], _)
            yield* iterable
        }
    })
    generators.push(function* (params, value) {
        yield [...params, value]
    })
    const product = compose(firstGenerator, ...generators)
    yield* product()
}

module.exports = {
    gen: cartesian,
    validation
}
