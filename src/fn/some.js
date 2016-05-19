var findIndex = require('../core/find-index.js')

function some (iterumStateCreator, validator) {
    return function (cb, context) {
        validator.validate([['Function']], arguments)
        var iterumState = iterumStateCreator(this)
        return !findIndex(iterumState, cb, validator, context).state.done
    }
}

module.exports = some
