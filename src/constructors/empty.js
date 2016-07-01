var List = require('./list.js')

module.exports = function (validator, Iterum) {
    return function () {
        return List(validator, Iterum)([])
    }
}
