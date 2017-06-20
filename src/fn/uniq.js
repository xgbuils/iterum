const baseUniq = require('../core/baseUniq')

module.exports = function uniq (iterable) {
    return this(baseUniq.bind(null, iterable, () => new Set(), e => e))
}
