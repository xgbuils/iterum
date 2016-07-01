var findIndex = require('../core/find-index.js')

function every (iterumStateCreator, validator) {
    return function (cb, context) {
        validator.validate([['Function']], arguments)
        var iterumState = iterumStateCreator(this)
        return findIndex(iterumState, function () {
            return !cb.apply(this, arguments)
        }, context).state.done
    }
}

module.exports = every
