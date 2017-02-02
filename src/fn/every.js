const findIndex = require('./findIndex')
const validation = [['Function']]

function every (cb, context) {
    return findIndex.fn
        .call(this, function (...args) {
            return !cb(...args)
        }, context) === -1
}

module.exports = {
    fn: every,
    validation
}
