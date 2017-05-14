module.exports = function* (iterable) {
    let index = 0
    for (const val of iterable) {
        yield [index, val]
        ++index
    }
}
