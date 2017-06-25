const baseZip = require('../internal/baseZip')
const findEntry = require('./findEntry')

function baseIsEqual (x, y, comparator) {
    const zipIterable = baseZip(
        ([a, b]) => comparator(a, b),
        () => false,
        [x, y]
    )
    return !findEntry(zipIterable, e => !e)
}

module.exports = baseIsEqual
