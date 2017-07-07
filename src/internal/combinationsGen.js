const createInitialArray = require('../internal/createInitialArray')

module.exports = function* (n, iterable) {
    if (n === 0) {
        yield this([])
        return
    }

    const iterator = iterable[Symbol.iterator]()
    const length = n - 1
    let pos = length
    const array = createInitialArray(iterator, n)
    if (n < 0 || array.length < n) {
        return
    }
    const steps = Array(n).fill(0)
    yield this(array.slice())

    while (true) {
        if (pos < 0) {
            ++pos
        } else if (pos === length) {
            const {value, done} = iterator.next()
            if (done) {
                return
            }
            array.push(value)
            ++steps[pos]
            yield this(toItem(array, steps))
            --pos
        } else if (steps[pos] < steps[pos + 1]) {
            ++steps[pos]
            yield this(toItem(array, steps))
            --pos
        } else {
            steps[pos] = 0
            ++pos
        }
    }
}

function toItem (array, steps) {
    return steps.map((step, index) => array[step + index])
}
