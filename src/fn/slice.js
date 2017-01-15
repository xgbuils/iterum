var generatorMethodFactory = require('../core/generator-method-factory.js')

function slice (iterumStateCreator, validator, Iterum) {
    return generatorMethodFactory(
        Iterum,
        iterumStateCreator,
        function defaultArgs (start, end) {
            validator.validate([['Number', 'Undefined'], ['Number', 'Undefined']], [start, end])
            return [
                start || 0,
                end === undefined ? Infinity : end
            ]
        },
        function next (args) {
            var index
            var result
            var iterator = this.iterator
            for (index = this.index; index < args[0]; ++index) {
                iterator.next()
            }
            if (index < args[1]) {
                result = iterator.next()
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
