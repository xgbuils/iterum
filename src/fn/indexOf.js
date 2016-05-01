var findIndex = require('../core/find-index.js')

function indexOf () {
    return function (e) {
        var iterator = this.generator()
        var found = findIndex(iterator, function (value) {
            return e === value
        }, 0)
        return found.state.done ? -1 : found.index
    }
}

module.exports = indexOf
