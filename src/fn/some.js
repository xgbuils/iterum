var findIndex = require('../core/find-index.js')
var createIterumState = require('../core/create-iterum-state.js')

function some (Iterum) {
    return function (cb, context) {
        var iterumState = createIterumState(this)
        return !findIndex(iterumState, cb, Iterum, context).state.done
    }
}

module.exports = some
