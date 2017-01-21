var compose = require('../fn/compose')

function Cartesian (validator, Iterum) {
    return function (...args) {
        validator.validate([['Array'], ['Array'], Infinity], args)
        return Iterum(function () {
            var generators = args.map(function (list) {
                return function (...params) {
                    var _ = params[params.length - 1]
                    _(...params)
                    return Iterum(list).build()()
                }
            })
            generators.push(function (...params) {
                return Iterum([params.slice(0, -1)]).build()()
            })
            var product = compose(...generators)
            return product()
        })
    }
}

module.exports = Cartesian
