const Iter = require('es-iter')

module.exports = {
    name: 'es-iter',
    fn () {
        new Iter(this.first).product(...this.rest)
    }
}
