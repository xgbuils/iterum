const findEntry = require('./findEntry')

module.exports = function some (cb, iterable) {
    return !!findEntry(cb, iterable)
}
