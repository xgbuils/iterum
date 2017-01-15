function build () {
    return function () {
        return this[Symbol.Iterator]
    }
}

module.exports = build
