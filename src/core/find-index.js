function findIndex (iterator, predicate, index, context) {
    var state
    var result
    while (!result) {
        state = iterator.next()
        if (state.done || predicate.call(context, state.value, index, iterator)) {
            result = {
                state: state,
                index: index
            }
        }
        ++index
    }
    return result
}

module.exports = findIndex
