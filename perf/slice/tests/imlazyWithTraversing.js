const I = require('imlazy')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'imlazy',
    fn () {
        traverse(I.slice(this.start, this.end, this.iterable))
    }
}
