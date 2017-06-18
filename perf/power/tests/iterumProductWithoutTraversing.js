const Iterum = require('iterum')

module.exports = {
    name: 'iterum product',
    fn () {
        Iterum(this.iterableProduct).product()
    }
}
