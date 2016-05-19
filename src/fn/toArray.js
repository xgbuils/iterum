var nextState = require('../core/next-state.js')

function toArray (iterumStateCreator, validator) {
    return function () {
        var iterumState = iterumStateCreator(this)
        var state
        var values = []
        while (!(state = nextState(iterumState, validator)).done) {
            values.push(state.value)
        }
        return values
    }
}

module.exports = toArray
