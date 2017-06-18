module.exports = function () {
    this.iterablePower = Array.from({length: this.length}, (_, i) => i)
    this.iterableProduct = Array.from({length: this.exponent}, () => {
        return this.iterablePower
    })
}
