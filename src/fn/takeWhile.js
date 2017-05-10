const entriesGen = require('../core/entriesGen')
const validation = [[], ['Function']]

function* takeWhile (iterable, cb, context) {
    for (const [index, val] of entriesGen(iterable)) {
        if (cb.call(context, val, index, iterable)) {
            yield val
        } else {
            return
        }
    }
}

module.exports = {
    gen: takeWhile,
    validation
}
