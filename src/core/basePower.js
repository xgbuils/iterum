const baseRepeat = require('./baseRepeat')
const baseFlatten = require('./baseFlatten')

module.exports = function* basePower (iterable, length) {
    let index = 0
    const generator = iterable[Symbol.iterator].bind(iterable)
    let iterator = generator()
    const iterators = [iterator]
    let state = iterator.next()
    if (state.done) {
        return
    }
    const firstValue = state.value
    const array = [firstValue]
    yield this(baseRepeat(array.slice(), length))
    while (index < length) {
        state = iterator.next()
        if (state.done) {
            ++index
            if (iterators.length <= index) {
                iterator = iterators[index] = generator()
                iterator.next()
            } else {
                iterator = iterators[index]
            }
        } else if (index > 0) {
            array[index] = state.value
            --index
            iterator = iterators[index] = generator()
        } else {
            array[index] = state.value
            yield this(baseFlatten([
                array.slice(),
                baseRepeat([firstValue], length - array.length)
            ], 1))
        }
    }
}
