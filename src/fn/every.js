var findIndex = require('../core/find-index.js')
var createIterumState = require('../core/create-iterum-state.js')

function every (Iterum) {
    return function (cb, context) {
        var iterumState = createIterumState(this)
        return findIndex(iterumState, function () {
            return !cb.apply(this, arguments)
        }, Iterum, context).state.done
    }
}

module.exports = every
