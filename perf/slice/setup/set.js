module.exports = function () {
    this.iterable = new Set(Array.from({length: this.length}, (_, i) => i))
}
