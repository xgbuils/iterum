var findIndex = require('../core/find-index.js')

function some () {
    return function (cb, context) {
        var iterator = this.generator()
        context = context || iterator
        return !findIndex(iterator, cb, 0, context || iterator).state.done
    }
}

module.exports = some
