const findEntry = require('./findEntry')

module.exports = function findIndex (iterable, cb) {
    const entry = findEntry(iterable, cb)
    return entry ? entry[0] : -1
}
