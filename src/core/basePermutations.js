const replaceFirsts = require('./replaceFirsts')

module.exports = function* basePermutations (iterable) {
    yield this(iterable)
    const iterator = iterable[Symbol.iterator]()
    const array = createInitialArray(iterator)
    if (array.length < 2) {
        return
    }
    let state = {}
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

function createInitialArray (iterator) {
    const array = []
    for (let i = 0; i < 2; ++i) {
        const {value, done} = iterator.next()
        if (!done) {
            array.push(value)
        }
    }
    return array
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
