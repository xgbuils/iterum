var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('concat', function () {
    it('iterator that returns values that predicate is true', function () {
        var a = new Iterum(Range(0, 3, 1))
        var b = new Iterum(Range(4, 16, 4))
        expect(a.concat(b).toArray()).to.be.deep.equal([0, 1, 2, 3, 4, 8, 12, 16])
    })
})
