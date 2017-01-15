function build () {
    return function () {
        return this[Symbol.iterator]
    }
}

module.exports = build
