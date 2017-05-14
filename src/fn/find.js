const findEntry = require('./findEntry')

module.exports = function find (iterable, cb, context) {
    const entry = findEntry(iterable, cb, context)
    return entry && entry[1]
}
