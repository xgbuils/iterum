const entriesGen = require('../core/entriesGen')

module.exports = function (cb, context) {
    for (const [index, val] of entriesGen.call(this)) {
        if (cb.call(context || this, val, index, this)) {
            return [index, val]
        }
    }
}
