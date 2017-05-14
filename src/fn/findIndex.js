const findEntry = require('./findEntry')

module.exports = function findIndex (iterable, cb, context) {
    const entry = findEntry(iterable, cb, context)
    return entry ? entry[0] : -1
}
