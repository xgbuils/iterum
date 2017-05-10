const findEntryFn = require('../core/findEntryFn')
const validation = [[], ['Function']]

function every (iterable, cb, context) {
    return !findEntryFn(iterable, function (...args) {
        return !cb.call(this, ...args)
    }, context)
}

module.exports = {
    fn: every,
    validation
}
