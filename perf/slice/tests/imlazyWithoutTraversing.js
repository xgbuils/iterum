const I = require('imlazy')

module.exports = {
    name: 'imlazy',
    fn () {
        I.slice(this.start, this.end, this.iterable)
    }
}
