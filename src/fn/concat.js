var generatorMethodFactory = require('../core/generator-method-factory.js')
var nextState = require('../core/next-state.js')

function concat (iterumStateCreator, validator) {
    return generatorMethodFactory(
        validator,
        iterumStateCreator,
        function (generator) {
            var Iterum = validator.Iterum
            validator.validate([['Function', Iterum, validator.IterumConstructor]], arguments)
            if (typeof generator !== 'function') {
                var iterum = generator instanceof Iterum ? generator : Iterum(generator)
                generator = iterum.build()
            }
            return [generator]
        },
        function next (args) {
            var state = nextState(this, validator)
            if (state.done && this.iterator !== args[0]) {
                this.iterator = args[0]
                state = nextState(this, validator)
            }
            return state
        },
        function (args) {
            return [args[0]()]
        }
    )
}

module.exports = concat
