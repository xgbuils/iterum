module.exports = function* padEnd (iterable, length, value) {
    const iterator = iterable[Symbol.iterator]()
    for (let i = 0; i < length; ++i) {
        const state = iterator.next()
        yield state.done ? value : state.value
    }
    yield* iterator
}
