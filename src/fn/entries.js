const baseEntries = require('../core/baseEntries')

module.exports = function entries (iterable) {
    return this(baseEntries(iterable))
}
