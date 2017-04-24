module.exports = function* () {
    let index = 0
    for (const val of this) {
        yield [index, val]
        ++index
    }
}
