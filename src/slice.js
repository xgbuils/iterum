const IterArray = require('iterarray')

module.exports = function slice (iterarray, start, end) {
    return IterArray(iterarray).slice(start, end)
}
