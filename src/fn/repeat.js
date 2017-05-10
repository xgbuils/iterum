const validation = [[], ['Number', 'Undefined']]

function* repeat (iterable, times = Infinity) {
    if (times <= 0) {
        return
    }
    const iterator = iterable[Symbol.iterator]()
    const state = iterator.next()
    if (state.done) {
        return
    }
    yield state.value
    yield* iterator
    for (let i = 1; i < times; ++i) {
        yield* iterable
    }
}

module.exports = {
    gen: repeat,
    validation
}
