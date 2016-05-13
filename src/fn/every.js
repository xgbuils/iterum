var findIndex = require('../core/find-index.js')

function every () {
    return function (cb, context) {
        var iterator = this.generator()
        return findIndex(iterator, function () {
            return !cb.apply(context, arguments)
        }, {
            index: 0
        }, this, context).state.done
    }
}

module.exports = every
