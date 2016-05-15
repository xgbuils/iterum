var nextState = require('../core/next-state.js')
var createIterumState = require('../core/create-iterum-state.js')

function toArray (Iterum) {
    return function () {
        var iterumState = createIterumState(this)
        var state
        var values = []
        while (!(state = nextState(iterumState, Iterum)).done) {
            values.push(state.value)
        }
        return values
    }
}

module.exports = toArray
