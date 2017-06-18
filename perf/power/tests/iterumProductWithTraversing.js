const Iterum = require('iterum')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'iterum product',
    fn () {
        traverse(Iterum(this.iterableProduct).product())
    }
}
