var List = require('./list.js')

module.exports = function (validator) {
    return function (value) {
        return List(validator)([value])
    }
}
