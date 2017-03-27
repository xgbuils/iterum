const validation = [['Function']]
const baseUniq = require('../core/baseUniq')

function* uniqBy (cb = e => e) {
    yield* baseUniq(this, new Set(), cb)
}

module.exports = {
    gen: uniqBy,
    validation
}
