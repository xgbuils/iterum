const baseUniq = require('../core/baseUniq')
const sameValueZero = require('../core/same-value-zero')

module.exports = function* uniqWith (iterable, comparator = sameValueZero) {
    yield* baseUniq(iterable, {
        arr: [],
        has (val) {
            return this.arr.find(e => comparator(e, val))
        },
        add (val) {
            this.arr.push(val)
        }
    })
}
