const compose = require('../fn/compose')

function Cartesian (validator, Iterum) {
    return function (...args) {
        validator.validate([['Array'], ['Array'], Infinity], args)
        return Iterum(function* () {
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
        })
    }
}

module.exports = Cartesian
