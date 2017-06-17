const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'native',
    fn () {
        traverse(this.iterable.slice(this.start, this.end))
    }
}
