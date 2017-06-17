const Iterum = require('iterum')

module.exports = {
    name: 'iterum',
    fn () {
        Iterum(this.iterable).slice(this.start, this.end)
    }
}
