var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('every', function () {
    it('if predicate is true for every value, returns true', function () {
        var value = Iterum(Range(5, 10, 1))
            .every(function (e) {
                return e >= 5 && e <= 10
            })
        expect(value).to.be.equal(true)
    })

    it('if predicate returns false for some value, returns false', function () {
        var value = Iterum(Range(5, 10, 1))
            .every(function (e) {
                return e < 10
            })
        expect(value).to.be.equal(false)
    })
})
