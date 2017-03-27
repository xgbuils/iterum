const baseUniq = require('../core/baseUniq')

function* uniq () {
    yield* baseUniq(this, new Set(), e => e)
}

module.exports = {
    gen: uniq
}
