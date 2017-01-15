var findIndex = require('../core/find-index.js')
var generatorMethodFactory = require('../core/generator-method-factory.js')

function filter (iterumStateCreator, validator, Iterum) {
    return generatorMethodFactory(
        Iterum,
        iterumStateCreator,
        function (cb, context) {
            validator.validate([['Function']], [cb, context])
            return [cb, context || this]
        },
        function (args) {
            return findIndex(this, args[0]).state
        }
    )
}

module.exports = filter
