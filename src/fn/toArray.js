var nextState = require('../core/next-state.js')

function toArray (Iterum, iterumStateCreator) {
    return function () {
        var iterumState = iterumStateCreator(this, Iterum)
        var state
        var values = []
        while (!(state = nextState(iterumState)).done) {
            values.push(state.value)
        }
        return values
    }
}

module.exports = toArray
