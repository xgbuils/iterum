const {map, compose} = require('ramda')

module.exports = {
    name: 'ramda',
    fn () {
        const n = this.numberOfMaps
        const {double} = this
        const mapDouble = map(double)
        const maps = Array(n).fill(mapDouble)
        compose(...maps)(this.iterable)
    }
}
