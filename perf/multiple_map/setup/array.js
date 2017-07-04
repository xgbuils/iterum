module.exports = function () {
    this.iterable = Array.from({length: this.length}, (_, i) => i)
}
