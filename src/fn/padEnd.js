const validation = [['Number', 'Undefined']]

function* padEnd (length = 0, value = undefined) {
    const iterator = this[Symbol.iterator]()
    for (let i = 0; i < length; ++i) {
        const state = iterator.next()
        yield state.done ? value : state.value
    }
    yield* iterator
}

module.exports = {
    gen: padEnd,
    validation
}
