const findIndex = require('./findIndex.js')

function indexOf (validator) {
    return function (e) {
        return findIndex(validator)
            .call(this, value => value === e)
    }
}

module.exports = indexOf
