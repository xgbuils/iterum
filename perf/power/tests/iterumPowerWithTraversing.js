const Iterum = require('iterum')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'iterum power',
    fn () {
        traverse(Iterum(this.iterablePower).power(this.exponent))
    }
}
