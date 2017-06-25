module.exports = function* filter (iterable, cb) {
    for (const val of iterable) {
        if (cb(val)) {
            yield val
        }
    }
}
