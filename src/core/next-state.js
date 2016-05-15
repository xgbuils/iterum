function nextState (iterumState, Iterum) {
    var state
    var pop
    var push
    do {
        var iterator = iterumState.iterator
        state = iterator.next()
        var stack = iterumState.stack
        var value = state.value
        var done = state.done
        pop = done && stack.length > 0
        push = !done && value instanceof Iterum
        if (pop) {
            iterumState.iterator = stack.pop()
        } else if (push) {
            stack.push(iterator)
            iterumState.iterator = value.build()()
        }
    } while (pop || push)
    return state
}

module.exports = nextState
