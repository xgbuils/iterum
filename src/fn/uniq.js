const baseUniq = require('../core/baseUniq')

function* uniq (iterable) {
    yield* baseUniq(iterable, new Set(), e => e)
}

module.exports = {
    gen: uniq
}
