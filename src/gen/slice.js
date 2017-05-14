module.exports = function* slice (iterable, start = 0, end = Infinity) {
    if (start >= end) {
        return
    }
    let index
    const iterator = iterable[Symbol.iterator]()
    for (index = 0; index < end; ++index) {
        const state = iterator.next()
        if (state.done) {
            return
        } else if (index >= start) {
            yield state.value
        }
    }
}
