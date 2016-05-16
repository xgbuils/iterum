var findIndex = require('../core/find-index.js')

function some (Iterum, iterumStateCreator) {
    return function (cb, context) {
        var iterumState = iterumStateCreator(this, Iterum)
        return !findIndex(iterumState, cb, Iterum, context).state.done
    }
}

module.exports = some
