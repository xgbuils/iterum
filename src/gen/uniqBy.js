const baseUniq = require('../core/baseUniq')

module.exports = function* uniqBy (iterable, cb = e => e) {
    yield* baseUniq(iterable, new Set(), cb)
}
