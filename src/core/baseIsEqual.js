const baseZip = require('../core/baseZip')
const findEntryFn = require('../core/findEntryFn')

function baseIsEqual (x, y, comparator) {
    const zipIterable = baseZip(
        ([a, b]) => comparator(a, b),
        () => false,
        [x, y]
    )
    return !findEntryFn(zipIterable, e => !e)
}

module.exports = baseIsEqual
