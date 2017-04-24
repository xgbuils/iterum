const findEntryFn = require('../core/findEntryFn')
const validation = [['Function']]

function find (cb, context) {
    const entry = findEntryFn
        .call(this, cb, context)
    return entry && entry[1]
}

module.exports = {
    fn: find,
    validation
}
