const baseZip = require('./baseZip')
const findEntry = require('./findEntry')
const typeVerify = require('type-verify')
const Iterable = require('./iterable')

function isIterable (object) {
    return typeVerify(object, [Iterable])
}

function baseIsEqual (x, y, comparator) {
    if (isIterable(x) && isIterable(y)) {
        const zipIterable = baseZip(
            ([a, b]) => comparator(a, b),
            () => false,
            [x, y]
        )
        return !findEntry(zipIterable, e => !e)
    }
    return false
}

module.exports = baseIsEqual
