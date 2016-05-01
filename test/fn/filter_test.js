var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('filter', function () {
    it('omit odd numbers', function () {
        var values = Iterum(Range(0, 10))
            .filter(function (e) {
                return e % 2 === 0
            })
            .toArray()
        expect(values).to.be.deep.equal([0, 2, 4, 6, 8, 10])
    })

    it('returns empty list, so any value of iterator is 3.14', function () {
        var values = new Iterum(Range(0, 10, 1))
            .filter(function (value) {
                return value === 3.14
            })
            .toArray()
        expect(values).to.be.deep.equal([])
    })
})
