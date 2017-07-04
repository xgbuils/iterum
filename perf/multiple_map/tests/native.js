module.exports = {
    name: 'native',
    fn () {
        const n = this.numberOfMaps
        const {double} = this
        let {iterable} = this
        for (let i = 0; i < n; ++i) {
            iterable = iterable.map(double)
        }
    }
}
