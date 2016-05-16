var findIndex = require('../core/find-index.js')

function indexOf (Iterum, iterumStateCreator) {
    return function (e) {
        var iterumState = iterumStateCreator(this, Iterum)
        var found = findIndex(iterumState, function (value) {
            return e === value
        }, Iterum)
        return found.state.done ? -1 : found.index
    }
}

module.exports = indexOf
