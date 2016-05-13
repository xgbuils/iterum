function findIndex (iterator, predicate, counter, iterum, context) {
    var state
    var result
    var index = counter.index
    while (!result) {
        state = iterator.next()
        if (state.done || predicate.call(context, state.value, index, iterum)) {
            result = {
                state: state,
                index: index
            }
        }
        ++index
    }
    counter.index = index
    return result
}

module.exports = findIndex
