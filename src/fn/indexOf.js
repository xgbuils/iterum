const findIndex = require('./findIndex.js')

function indexOf (e) {
    return findIndex.fn
        .call(this, value => value === e)
}
module.exports = {
    fn: indexOf
}
