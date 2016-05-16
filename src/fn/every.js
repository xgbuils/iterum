var findIndex = require('../core/find-index.js')

function every (Iterum, iterumStateCreator) {
    return function (cb, context) {
        var iterumState = iterumStateCreator(this, Iterum)
        return findIndex(iterumState, function () {
            return !cb.apply(this, arguments)
        }, Iterum, context).state.done
    }
}

module.exports = every
