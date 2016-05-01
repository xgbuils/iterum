var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('some', function () {
    it('if predicate is true for some value, returns true', function () {
        var value = Iterum(Range(5, 10, 1))
            .some(function (e) {
                return e % 2 === 0
            })
        expect(value).to.be.equal(true)
    })

    it('if predicate retur false for every value, returns false', function () {
        var value = new Iterum(Range(5, 10, 1))
            .some(function (e) {
                return e > 20
            })
        expect(value).to.be.equal(false)
    })
})
