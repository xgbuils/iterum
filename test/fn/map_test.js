var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('map', function () {
    it('method returns and Iterum instance', function () {
        var iterator = new Iterum(Range(0, 3, 1))
        expect(iterator.map(function (value) {
            return value * 2
        })).to.be.instanceof(Iterum)
    })

    it('iterator that returns values incremented 5 unities', function () {
        var iterator = new Iterum(Range(0, 2, 1)).map(function (value) {
            return value + 5
        })
        expect(iterator.toArray()).to.be.deep.equal([5, 6, 7])
    })
})
