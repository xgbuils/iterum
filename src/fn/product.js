function* product (iterables) {
    iterables = [...iterables] // eslint-disable-line no-param-reassign
    const {length} = iterables
    let index = 0
    const generators = iterables
        .map(iterable => iterable[Symbol.iterator].bind(iterable))
    const iterators = generators.map(generator => generator())
    const states = iterators.map(iterator => iterator.next())
    if (states.length === 0 || !states.every(({done}) => !done)) {
        return
    }
    const array = states.map(({value}) => value)
    let iterator = generators[index]()
    while (index < length) {
        const state = iterator.next()
        if (state.done) {
            ++index
            iterator = iterators[index]
        } else if (index > 0) {
            array[index] = state.value
            --index
            iterator = iterators[index] = generators[index]()
        } else {
            array[index] = state.value
            yield this(array.slice())
        }
    }
}

module.exports = product
