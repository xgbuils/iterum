var generatorMethodFactory = require('../core/generator-method-factory.js')
var nextState = require('../core/next-state.js')

function slice (iterumStateCreator, validator) {
    return generatorMethodFactory(
        validator,
        iterumStateCreator,
        function defaultArgs (start, end) {
            validator.validate([['Number', 'Undefined'], ['Number', 'Undefined']], arguments)
            return [
                start || 0,
                end === undefined ? Infinity : end
            ]
        },
        function next (args) {
            var index
            var result
            for (index = this.index; index < args[0]; ++index) {
                nextState(this, validator)
            }
            if (index < args[1]) {
                result = nextState(this, validator)
                ++index
            }
            this.index = index
            return result || {
                value: undefined,
                done: true
            }
        }
    )
}

module.exports = slice
