var compose = require('../fn/compose')

function Cartesian (validator, Iterum) {
    return function (...args) {
        validator.validate([['Array'], ['Array'], Infinity], args)
        return Iterum(function* () {
            var generators = args.map(function (list) {
                return function* (...params) {
                    var _ = params[params.length - 1]
                    _(...params)
                    yield* Iterum(list)
                }
            })
            generators.push(function* (...params) {
                yield* Iterum([params.slice(0, -1)])
            })
            var product = compose(...generators)
            yield* product()
        })
    }
}

module.exports = Cartesian
