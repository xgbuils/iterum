var findEntry = require('./findEntry')

function find (validator) {
    return function (cb, context) {
        const entry = findEntry(validator)
            .call(this, cb, context)
        return entry && entry[1]
    }
}

module.exports = find
