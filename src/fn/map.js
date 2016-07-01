var generatorMethodFactory = require('../core/generator-method-factory.js')

function map (iterumStateCreator, validator, Iterum) {
    return generatorMethodFactory(
        Iterum,
        iterumStateCreator,
        function (cb, context) {
            validator.validate([['Function']], arguments)
            return [cb, context || this]
        },
        function (args) {
            var state = this.iterator.next()
            var done = state.done
            var result = {
                value: done ? undefined : args[0].call(args[1], state.value, this.index, this.iterum),
                done: done
            }
            ++this.index
            return result
        }
    )
}

module.exports = map
