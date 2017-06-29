const findEntry = require('./findEntry')

module.exports = function every (cb, iterable) {
    return !findEntry(function (...args) {
        return !cb.call(this, ...args)
    }, iterable)
}
