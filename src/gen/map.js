module.exports = function* map (iterable, cb) {
    for (const val of iterable) {
        yield cb(val)
    }
}
