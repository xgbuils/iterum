var findIndex = require('../core/find-index.js')
var createIterumState = require('../core/create-iterum-state.js')

function indexOf (Iterum) {
    return function (e) {
        var iterumState = createIterumState(this)
        var found = findIndex(iterumState, function (value) {
            return e === value
        }, Iterum)
        return found.state.done ? -1 : found.index
    }
}

module.exports = indexOf
