const findEntry = require('./findEntry')

module.exports = function some (iterable, cb) {
    return !!findEntry(iterable, cb)
}
