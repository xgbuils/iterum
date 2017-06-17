const R = require('ramda')

module.exports = {
    name: 'ramda',
    fn () {
        R.slice(this.start, this.end, this.iterable)
    }
}
