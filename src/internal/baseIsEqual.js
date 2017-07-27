const baseZip = require('./baseZip')
const findEntry = require('./findEntry')
const isIterable = require('./isIterable')

function baseIsEqual (x, y, comparator) {
    if (isIterable(x) && isIterable(y)) {
        const zipIterable = baseZip(
            ([a, b]) => comparator(a, b),
            () => false,
            [x, y]
        )
        return !findEntry(e => !e, zipIterable)
    }
    return false
}

module.exports = baseIsEqual
