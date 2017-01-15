var compose = require('../fn/compose')
var List = require('./list')

function Cartesian (validator, Iterum) {
    var IterumList = List(validator, Iterum)
    return function (...args) {
        validator.validate([['Array'], ['Array'], Infinity], args)
        return Iterum(function () {
            var generators = args.map(function (list) {
                return function (...params) {
                    var _ = params[params.length - 1]
                    _.apply(null, params)
                    return IterumList(list).build()()
                }
            })
            generators.push(function (...params) {
                return IterumList([params.slice(0, -1)]).build()()
            })
            var product = compose.apply(null, generators)
            return product()
        })
    }
}

module.exports = Cartesian
