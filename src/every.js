const findEntry = require('./findEntry')

module.exports = function every (iterable, cb) {
    return !findEntry(iterable, function (...args) {
        return !cb.call(this, ...args)
    })
}
