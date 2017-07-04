const {map} = require('iterum')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'iterum function',
    fn () {
        const n = this.numberOfMaps
        const {double} = this
        const mapDouble = map(double)
        let {iterable} = this
        for (let i = 0; i < n; ++i) {
            iterable = mapDouble(iterable)
        }
        traverse(iterable)
    }
}
