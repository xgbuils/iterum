var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('every', function () {
    it('if predicate is true for every value, returns true', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.every(function (e) {
            return e >= 5 && e <= 10
        })).to.be.equal(true)
    })

    it('if predicate returns false for some value, returns false', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.every(function (e) {
            return e < 10
        })).to.be.equal(false)
    })
})
