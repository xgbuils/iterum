var findIndex = require('../core/find-index.js')

function every (iterumStateCreator, validator) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        var iterumState = iterumStateCreator(this)
        return findIndex(iterumState, function (...args) {
            return !cb.apply(this, args)
        }, context).state.done
    }
}

module.exports = every
