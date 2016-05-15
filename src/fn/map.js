var generatorMethodFactory = require('../core/generator-method-factory.js')

function map (Iterum) {
    return generatorMethodFactory(
        Iterum,
        function (cb, context) {
            return [cb, context || this]
        },
        function (iterumState, args) {
            var state = iterumState.iterator.next()
            var done = state.done
            var result = {
                value: done ? undefined : args[0].call(args[1], state.value, iterumState.index, iterumState.iterum),
                done: done
            }
            ++iterumState.index
            return result
        }
    )
}

module.exports = map
