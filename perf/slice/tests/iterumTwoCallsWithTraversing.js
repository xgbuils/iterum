const Iterum = require('iterum')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'iterum',
    fn () {
        const iterable = Iterum(this.iterable)
        traverse(iterable.slice(this.start, this.end))
        traverse(iterable.slice(this.start, this.end))
    }
}
