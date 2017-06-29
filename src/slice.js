const IterArray = require('iterarray')

module.exports = function slice (start, end, iterarray) {
    return IterArray(iterarray).slice(start, end)
}
