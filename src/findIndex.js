const findEntry = require('./findEntry')

module.exports = function findIndex (cb, iterable) {
    const entry = findEntry(cb, iterable)
    return entry ? entry[0] : -1
}
