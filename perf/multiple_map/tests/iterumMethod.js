const Iterum = require('iterum')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'iterum method',
    fn () {
        const n = this.numberOfMaps
        const {double} = this
        let iterable = Iterum(this.iterable)
        for (let i = 0; i < n; ++i) {
            iterable = iterable.map(double)
        }
        traverse(iterable)
    }
}
