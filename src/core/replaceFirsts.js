module.exports = function* (iterable, array) {
    const {length} = array
    let i = 0
    for (const val of iterable) {
        yield i < length ? array[i] : val
        ++i
    }
}
