var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('indexOf', function () {
    it('iterator that returns values that predicate is true', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(7)).to.be.deep.equal(2)
    })

    it('iterator that returns values that predicate is true', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(0)).to.be.deep.equal(-1)
    })
})