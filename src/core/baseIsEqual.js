const baseZip = require('../core/baseZip')
const findEntryFn = require('../core/findEntryFn')

function baseIsEqual (iterable, comparator) {
    const zipIterable = baseZip
        .call(this, ([a, b]) => comparator(a, b), () => false, [iterable])
    return !findEntryFn.call(zipIterable, e => !e)
}

module.exports = baseIsEqual
