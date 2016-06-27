var List = require('./list.js')

module.exports = function (iterumStateCreator, validator) {
    return function () {
        return List(iterumStateCreator, validator)([])
    }
}
