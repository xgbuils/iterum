function* permutations (iterable) {
    const array = [...iterable]
    yield array.slice()
    const n = array.length - 1
    const aux = [0]

    let i = 0
    while (i < n) {
        if (aux[i] <= i) {
            swap(array, aux[i], i + 1)
            revert(array, 0, i)
            yield array.slice()
            ++aux[i]
            i = 0
        } else {
            aux[i] = 0
            ++i
            if (aux.length <= i) {
                aux.push(0)
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

module.exports = {
    gen: permutations
}
