const findEntry = require('./findEntry')
const validation = [['Function']]

function every (cb, context) {
    return !findEntry.fn
        .call(this, function (...args) {
            return !cb.call(this, ...args)
        }, context)
}

module.exports = {
    fn: every,
    validation
}
