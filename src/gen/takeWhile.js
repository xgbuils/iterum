module.exports = function* takeWhile (iterable, cb) {
    for (const val of iterable) {
        if (cb(val)) {
            yield val
        } else {
            return
        }
    }
}
