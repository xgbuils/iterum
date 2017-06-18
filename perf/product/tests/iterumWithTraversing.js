const Iterum = require('iterum')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'iterum',
    fn () {
        traverse(Iterum(this.iterable).product())
    }
}
