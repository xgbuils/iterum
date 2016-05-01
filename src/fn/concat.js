var generatorMethodFactory = require('../core/generator-method-factory.js')

function concat (Iterum) {
    return generatorMethodFactory(
        function (generator) {
            if (typeof generator !== 'function') {
                generator = Iterum(generator).generator
            }
            return [generator()]
        },
        function next (iterator, counter, args) {
            var state = iterator.next()
            if (state.done && iterator !== args[0]) {
                iterator = args[0]
                state = iterator.next()
            }
            return state
        }
    )
}

module.exports = concat
