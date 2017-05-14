const findEntry = require('./findEntry')

module.exports = function every (iterable, cb, context) {
    return !findEntry(iterable, function (...args) {
        return !cb.call(this, ...args)
    }, context)
}
