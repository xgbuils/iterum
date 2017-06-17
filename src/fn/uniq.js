const baseUniq = require('../core/baseUniq')

module.exports = function uniq (iterable) {
    return this(baseUniq(iterable, new Set(), e => e))
}
