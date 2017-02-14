const findEntry = require('./findEntry')

function includes (e) {
    return !!findEntry.fn
        .call(this, value => value === e || Object.is(value, e))
}

module.exports = {
    fn: includes
}
