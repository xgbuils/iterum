var generatorMethodFactory = require('../core/generator-method-factory.js')

function concat (iterumStateCreator, validator) {
    return generatorMethodFactory(
        validator,
        iterumStateCreator,
        function (generator) {
            var Iterum = validator.Iterum
            validator.validate([['Function', Iterum]], arguments)
            if (typeof generator !== 'function') {
                var iterum = generator instanceof Iterum ? generator : Iterum(generator)
                generator = iterum.build()
            }
            return [generator]
        },
        function next (args) {
            var state = this.iterator.next()
            if (state.done && this.iterator !== args[0]) {
                this.iterator = args[0]
                state = this.iterator.next()
            }
            return state
        },
        function (args) {
            return [args[0]()]
        }
    )
}

module.exports = concat
