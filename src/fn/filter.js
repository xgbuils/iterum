var findIndex = require('../core/find-index.js')

var generatorMethodFactory = require('../core/generator-method-factory.js')

function filter (Iterum) {
    return generatorMethodFactory(
        Iterum,
        function (cb, context) {
            return [cb, context || this]
        },
        function (iterator, counter, args) {
            var found = findIndex(iterator, args[0], counter.index, args[1])
            counter.index = found.index
            return found.state
        }
    )
}

module.exports = filter
