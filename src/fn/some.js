var findIndex = require('../core/find-index.js')

function some () {
    return function (cb, context) {
        var iterator = this.generator()
        return !findIndex(iterator, cb, {
            index: 0
        }, this, context).state.done
    }
}

module.exports = some
