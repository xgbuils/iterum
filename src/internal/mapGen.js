module.exports = function* (cb, iterable) {
    for (const val of iterable) {
        yield cb(val)
    }
}
