const Iterum = require('iterum')

module.exports = {
    name: 'iterum power',
    fn () {
        Iterum(this.iterablePower).power(this.exponent)
    }
}
