const baseUniq = require('../core/baseUniq')

module.exports = function* uniq (iterable) {
    yield* baseUniq(iterable, new Set(), e => e)
}
