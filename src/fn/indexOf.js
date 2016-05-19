var findIndex = require('../core/find-index.js')

function indexOf (iterumStateCreator, validator) {
    return function (e) {
        var iterumState = iterumStateCreator(this)
        var found = findIndex(iterumState, function (value) {
            return e === value
        }, validator)
        return found.state.done ? -1 : found.index
    }
}

module.exports = indexOf
