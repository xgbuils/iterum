const entriesGen = require('./internal/entriesGen')

module.exports = function entries (iterable) {
    return this(entriesGen.bind(null, iterable))
}
