var nextState = require('../core/next-state.js')

function findIndex (iterumState, predicate, Iterum, context) {
    var state
    var result
    var index = iterumState.index
    while (!result) {
        state = nextState(iterumState, Iterum)
        if (state.done || predicate.call(context, state.value, index, iterumState.iterum)) {
            result = {
                state: state,
                index: index
            }
        }
        ++index
    }
    iterumState.index = index
    return result
}

module.exports = findIndex
