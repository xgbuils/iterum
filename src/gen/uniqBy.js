const baseUniq = require('../core/baseUniq')

module.exports = function* uniqBy (iterable, cb) {
    yield* baseUniq(iterable, new Set(), cb)
}
