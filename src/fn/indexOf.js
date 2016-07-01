var findIndex = require('../core/find-index.js')

function indexOf (iterumStateCreator) {
    return function (e) {
        var iterumState = iterumStateCreator(this)
        var found = findIndex(iterumState, function (value) {
            return e === value
        })
        return found.state.done ? -1 : found.index
    }
}

module.exports = indexOf
