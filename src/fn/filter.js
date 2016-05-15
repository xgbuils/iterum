var findIndex = require('../core/find-index.js')

var generatorMethodFactory = require('../core/generator-method-factory.js')

function filter (Iterum) {
    return generatorMethodFactory(
        Iterum,
        function (cb, context) {
            return [cb, context || this]
        },
        function (iterumState, args) {
            var found = findIndex(iterumState, args[0], Iterum)
            return found.state
        }
    )
}

module.exports = filter
