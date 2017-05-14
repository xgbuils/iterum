module.exports = function* dropWhile (iterable, cb) {
    let next = false
    for (const val of iterable) {
        if (next) {
            yield val
        } else if (!cb(val)) {
            next = true
            yield val
        }
    }
}
