const findEntryFn = require('../core/findEntryFn')
const validation = [['Function']]

function every (cb, context) {
    return !findEntryFn
        .call(this, function (...args) {
            return !cb.call(this, ...args)
        }, context)
}

module.exports = {
    fn: every,
    validation
}
