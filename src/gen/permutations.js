const replaceFirsts = require('../core/replaceFirsts')

module.exports = function* permutations (iterable) {
    yield this(iterable)
    const iterator = iterable[Symbol.iterator]()
    const array = []
    let state = iterator.next()
    if (state.done) {
        return
    }
    array.push(state.value)
    state = iterator.next()
    if (state.done) {
        return
    }
    array.push(state.value)
    const aux = [0]

    let i = 0
    while (!state.done) {
        if (aux[i] <= i) {
            swap(array, aux[i], i + 1)
            revert(array, 0, i)
            yield this(replaceFirsts.bind(null, iterable, array.slice()))
            ++aux[i]
            i = 0
        } else {
            aux[i] = 0
            ++i
            if (aux.length <= i) {
                state = iterator.next()
                aux.push(0)
                array.push(state.value)
            }
        }
    }
}

function revert (array, start, end) {
    while (end > start) {
        swap(array, end, start)
        /* eslint-disable no-param-reassign */
        --end
        ++start
        /* eslint-enable no-param-reassign */
    }
}

function swap (array, j, k) {
    [array[j], array[k]] = [array[k], array[j]]
}
