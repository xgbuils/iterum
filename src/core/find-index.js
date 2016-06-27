function findIndex (iterumState, predicate, validator, context) {
    var state
    var result
    var index = iterumState.index
    while (!result) {
        state = iterumState.iterator.next()
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
