module.exports = function () {
    const {n, length} = this
    this.iterable = Array.from({length: n}, (_, i) => {
        return Array.from({length}, (_, j) => {
            return i + j
        })
    })
    ;[this.first, ...this.rest] = this.iterable
}
