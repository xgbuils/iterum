var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('some', function () {
    it('if predicate is true for some value, returns true', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.some(function (e) {
            return e % 2 === 0
        })).to.be.equal(true)
    })

    it('if predicate retur false for every value, returns false', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.some(function (e) {
            return e > 20
        })).to.be.equal(false)
    })
})
