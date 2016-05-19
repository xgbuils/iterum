var findIndex = require('../core/find-index.js')
var generatorMethodFactory = require('../core/generator-method-factory.js')

function filter (iterumStateCreator, validator) {
    return generatorMethodFactory(
        validator,
        iterumStateCreator,
        function (cb, context) {
            validator.validate([['Function']], arguments)
            return [cb, context || this]
        },
        function (args) {
            var found = findIndex(this, args[0], validator)
            return found.state
        }
    )
}

module.exports = filter
