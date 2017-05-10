const findEntryFn = require('../core/findEntryFn')
const validation = [[], ['Function']]

function findIndex (iterable, cb, context) {
    const entry = findEntryFn(iterable, cb, context)
    return entry ? entry[0] : -1
}

module.exports = {
    fn: findIndex,
    validation
}
