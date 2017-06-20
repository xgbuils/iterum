const baseUniq = require('../core/baseUniq')

module.exports = function uniqWith (iterable, comparator) {
    return this(baseUniq.bind(null, iterable, () => ({
        arr: [],
        has (val) {
            return this.arr.find(e => comparator(e, val))
        },
        add (val) {
            this.arr.push(val)
        }
    })))
}
