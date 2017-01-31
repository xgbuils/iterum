const findIndex = require('./findIndex')

function some (validator) {
    return function (cb, context) {
        return findIndex(validator)
            .call(this, cb, context) !== -1
    }
}

module.exports = some
