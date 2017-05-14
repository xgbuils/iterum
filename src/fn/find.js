const findEntry = require('./findEntry')

module.exports = function find (iterable, cb) {
    const entry = findEntry(iterable, cb)
    return entry && entry[1]
}
