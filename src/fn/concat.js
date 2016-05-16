var generatorMethodFactory = require('../core/generator-method-factory.js')
var nextState = require('../core/next-state.js')

function concat (Iterum, iterumStateCreator) {
    return generatorMethodFactory(
        Iterum,
        iterumStateCreator,
        function (generator) {
            if (typeof generator !== 'function') {
                generator = Iterum(generator).build()
            }
            return [generator]
        },
        function next (iterumState, args) {
            var state = nextState(iterumState)
            if (state.done && iterumState.iterator !== args[0]) {
                iterumState.iterator = args[0]
                state = nextState(iterumState)
            }
            return state
        },
        function (args) {
            return [args[0]()]
        }
    )
}

module.exports = concat
