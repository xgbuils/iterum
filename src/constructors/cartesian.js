const compose = require('generator.compose')
const validation = [['Array'], ['Array'], Infinity]

function* cartesian (...args) {
    const Iterum = this
    const generators = args.map(function (list) {
        return function* (...params) {
            const _ = params[params.length - 1]
            _(...params)
            yield* Iterum(list)
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
