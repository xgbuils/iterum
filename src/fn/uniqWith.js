const validation = [['Function']]
const baseUniq = require('../core/baseUniq')
const sameValueZero = require('../core/same-value-zero')

function* uniqWith (comparator = sameValueZero) {
    yield* baseUniq(this, {
        arr: [],
        has (val) {
            return this.arr.find(e => comparator(e, val))
        },
        add (val) {
            this.arr.push(val)
        }
    })
}

module.exports = {
    gen: uniqWith,
    validation
}
