function clone (Iterum) {
    return function () {
        return Iterum(this.generator)
    }
}

module.exports = clone
