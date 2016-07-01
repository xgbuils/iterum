var compose = require('../fn/compose')
var List = require('./list')

function Cartesian (validator) {
    var Iterum = validator.Iterum
    var IterumList = List(validator)
    return function () {
        validator.validate([['Array'], ['Array'], Infinity], arguments)
        var args = [].slice.call(arguments)
        var x = Iterum(function () {
            var generators = args.map(function (list) {
                return function () {
                    var _ = arguments[arguments.length - 1]
                    _.apply(null, arguments)
                    return IterumList(list).build()()
                }
            })
            generators.push(function () {
                var args = [].slice.call(arguments, 0, -1)
                return IterumList([args]).build()()
            })
            var product = compose.apply(null, generators)
            var y = product()
            return y
        })
        return x
    }
}

module.exports = Cartesian
