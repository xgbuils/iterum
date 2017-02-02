const findIndex = require('./findIndex')
const validation = [['Function']]

function some (cb, context) {
    return findIndex.fn
        .call(this, cb, context) !== -1
}

module.exports = {
    fn: some,
    validation
}
