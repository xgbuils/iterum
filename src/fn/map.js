var generatorMethodFactory = require('../core/generator-method-factory.js')

function map () {
    return generatorMethodFactory(
        function (cb, context) {
            return [cb, context || this]
        },
        function (iterator, counter, args) {
            var state = iterator.next()
            var done = state.done
            var result = {
                value: done ? undefined : args[0].call(args[1], state.value, counter.index, iterator),
                done: done
            }
            ++counter.index
            return result
        }
    )
}

module.exports = map
