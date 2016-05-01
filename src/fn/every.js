var findIndex = require('../core/find-index.js')

function every () {
    return function (cb, context) {
        var iterator = this.generator()
        context = context || iterator
        return findIndex(iterator, function () {
            return !cb.apply(context, arguments)
        }, 0, context || iterator).state.done
    }
}

module.exports = every
