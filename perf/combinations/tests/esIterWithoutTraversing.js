const Iter = require('es-iter')

module.exports = {
    name: 'es-iter',
    fn () {
        new Iter(this.iterable).combinations(this.n)
    }
}
