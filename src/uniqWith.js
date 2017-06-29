const baseUniq = require('./internal/baseUniq')

module.exports = function uniqWith (comparator, iterable) {
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
