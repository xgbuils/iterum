var findIndex = require('../core/find-index.js')

function every () {
    return function (cb, context) {
        var iterator = this
        return findIndex(iterator, function () {
            return !cb.apply(this, arguments)
        }, 0, context || iterator).state.done
    }
}

module.exports = every
