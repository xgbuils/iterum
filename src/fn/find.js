const findEntryFn = require('../core/findEntryFn')
const validation = [[], ['Function']]

function find (iterable, cb, context) {
    const entry = findEntryFn(iterable, cb, context)
    return entry && entry[1]
}

module.exports = {
    fn: find,
    validation
}
