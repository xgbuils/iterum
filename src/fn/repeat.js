const validation = [['Number', 'Undefined']]

function* repeat (times = Infinity) {
    if (times <= 0) {
        return
    }
    const iterator = this[Symbol.iterator]()
    const state = iterator.next()
    if (state.done) {
        return
    }
    yield state.value
    yield* iterator
    for (let i = 1; i < times; ++i) {
        yield* this
    }
}

module.exports = {
    gen: repeat,
    validation
}
