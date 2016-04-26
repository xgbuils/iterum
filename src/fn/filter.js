var findIndex = require('../core/find-index.js')

function filter (Iterum) {
    return function (cb, context) {
        var index = 0
        var iterator = this
        return new Iterum(function () {
        	var found = findIndex(iterator, cb, index, context || iterator)
            ++index
            return found.state
        })
    }
}

module.exports = filter