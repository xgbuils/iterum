const validation = [[], ['Function']]
const baseUniq = require('../core/baseUniq')

function* uniqBy (iterable, cb = e => e) {
    yield* baseUniq(iterable, new Set(), cb)
}

module.exports = {
    gen: uniqBy,
    validation
}
