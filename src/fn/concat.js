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
        function next (iterumState, args) {
            var state = nextState(iterumState, validator)
            if (state.done && iterumState.iterator !== args[0]) {
                iterumState.iterator = args[0]
                state = nextState(iterumState, validator)
            }
            return state
        },
        function (args) {
            return [args[0]()]
        }
    )
}

module.exports = concat
