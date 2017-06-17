module.exports = function* (iterable, cb) {
    for (const val of iterable) {
        yield cb(val)
    }
}
