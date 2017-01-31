const findEntry = require('./findEntry')

function findIndex (validator) {
    return function (cb, context) {
        const entry = findEntry(validator)
            .call(this, cb, context)
        return entry ? entry[0] : -1
    }
}

module.exports = findIndex
