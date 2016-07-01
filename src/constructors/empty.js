var List = require('./list.js')

module.exports = function (validator) {
    return function () {
        return List(validator)([])
    }
}
