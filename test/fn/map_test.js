var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('map', function () {
    it('iterator that returns values incremented 5 unities', function () {
        var iterator = new Iterum(Range(0, 2, 1)).map(function (value) {
            return value + 5
        })
        expect(iterator.toArray()).to.be.deep.equal([5, 6, 7])
    })
})
