var generatorMethodFactory = require('../core/generator-method-factory.js')
var nextState = require('../core/next-state.js')

function slice (Iterum, iterumStateCreator) {
    return generatorMethodFactory(
        Iterum,
        iterumStateCreator,
        function defaultArgs (start, end) {
            return [
                start || 0,
                end === undefined ? Infinity : end
            ]
        },
        function next (iterumState, args) {
            var index
            var result
            for (index = iterumState.index; index < args[0]; ++index) {
                nextState(iterumState)
            }
            if (index < args[1]) {
                result = nextState(iterumState)
                ++index
            }
            iterumState.index = index
            return result || {
                value: undefined,
                done: true
            }
        }
    )
}

module.exports = slice
