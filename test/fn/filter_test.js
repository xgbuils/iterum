var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('filter', function () {
    it('iterator that returns values that predicate is true', function () {
        var iterator = new Iterum(Range(0, 10, 1)).filter(function (value) {
            return value % 2 === 0
        })
        expect(iterator.toArray()).to.be.deep.equal([0, 2, 4, 6, 8, 10])
    })
})
