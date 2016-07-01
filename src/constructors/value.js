var List = require('./list.js')

module.exports = function (validator, Iterum) {
    return function (value) {
        return List(validator, Iterum)([value])
    }
}
