function* entries () {
    let index = 0
    for (const val of this) {
        yield [index, val]
        ++index
    }
}

module.exports = {
    gen: entries
}
