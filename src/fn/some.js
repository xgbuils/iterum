const findEntryFn = require('../core/findEntryFn')
const validation = [[], ['Function']]

function some (iterable, cb, context) {
    return !!findEntryFn(iterable, cb, context)
}

module.exports = {
    fn: some,
    validation
}
