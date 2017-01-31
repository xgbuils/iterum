const findIndex = require('./findIndex')

function every (validator) {
    return function (cb, context) {
    	validator.validate([['Function']], [cb, context])
        return findIndex(validator)
            .call(this, function (...args) {
                return !cb(...args)
            }, context) === -1
    }
}

module.exports = every
