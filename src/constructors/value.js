var List = require('./list.js')

module.exports = function (iterumStateCreator, validator) {
    return function (value) {
        return List(iterumStateCreator, validator)([value])
    }
}
