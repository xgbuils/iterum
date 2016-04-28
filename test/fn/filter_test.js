var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('filter', function () {
    it('method returns and Iterum instance', function () {
        var iterator = new Iterum(Range(0, 3, 1))
        expect(iterator.filter(function (e) {
            return e % 2 === 0
        })).to.be.instanceof(Iterum)
    })

    it('iterator that returns values that predicate is true', function () {
        var iterator = new Iterum(Range(0, 10, 1)).filter(function (value) {
            return value % 2 === 0
        })
        expect(iterator.toArray()).to.be.deep.equal([0, 2, 4, 6, 8, 10])
    })

    it('returns empty iterator if predicate always returns false', function () {
        var iterator = new Iterum(Range(0, 10, 1)).filter(function (value) {
            return value === 3.14
        })
        expect(iterator.toArray()).to.be.deep.equal([])
    })
})
