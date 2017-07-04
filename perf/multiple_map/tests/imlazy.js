const {map} = require('imlazy')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'imlazy',
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
