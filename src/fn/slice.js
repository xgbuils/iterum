const entriesGen = require('../core/entriesGen')
const validation = [[], ['Number', 'Undefined'], ['Number', 'Undefined']]

function* slice (iterable, start = 0, end = Infinity) {
    for (const [index, val] of entriesGen(iterable)) {
        if (index >= end) {
            return
        } else if (index >= start) {
            yield val
        }
    }
}

module.exports = {
    gen: slice,
    validation
}
