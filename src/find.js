const findEntry = require('./findEntry')

module.exports = function find (cb, iterable) {
    const entry = findEntry(cb, iterable)
    return entry && entry[1]
}
