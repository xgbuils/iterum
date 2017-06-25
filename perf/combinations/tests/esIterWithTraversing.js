const Iter = require('es-iter')
const traverse = require('../../traverse_iterable')

module.exports = {
    name: 'es-iter',
    fn () {
        traverse(new Iter(this.iterable).combinations(this.n))
    }
}
