var List = require('./list.js')

module.exports = function (value) {
    return List.call(this, [value])
}
