const findEntry = require('./findEntry')

module.exports = function some (iterable, cb, context) {
    return !!findEntry(iterable, cb, context)
}
