const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* zip (...iterables) {
    const iterableList = [this, ...iterables]
    const iterators = iterableList.map(iterable => iterable[Symbol.iterator]())
    let next = true
    while (next) {
        const states = iterators.map(iterator => iterator.next())
        next = states.every(state => !state.done)
        if (next) {
            yield states.map(state => state.value)
        }
    }
}

module.exports = {
    gen: zip,
    validation
}
