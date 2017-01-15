var findIndex = require('../core/find-index.js')

function some (iterumStateCreator, validator) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        var iterumState = iterumStateCreator(this)
        return !findIndex(iterumState, cb, context).state.done
    }
}

module.exports = some
