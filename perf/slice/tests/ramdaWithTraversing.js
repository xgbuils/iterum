const R = require('ramda')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'ramda',
    fn () {
        traverse(R.slice(this.start, this.end, this.iterable))
    }
}
