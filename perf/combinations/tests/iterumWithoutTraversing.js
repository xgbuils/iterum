const Iterum = require('iterum')

module.exports = {
    name: 'iterum',
    fn () {
        Iterum(this.iterable).combinations(this.n)
    }
}
