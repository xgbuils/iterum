const {List} = require('immutable')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'immutable method',
    fn () {
        const n = this.numberOfMaps
        const {double} = this
        let iterable = new List(this.iterable)
        for (let i = 0; i < n; ++i) {
            iterable = iterable.map(double)
        }
        traverse(iterable)
    }
}
