var expect = require('chai').expect
var sinon = require('sinon')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('forEach', function () {
    it('traverse all values', function () {
        var cb = sinon.spy()
        var iterum = Iterum(Range(5, 10, 1))
        iterum.forEach(cb)
        expect(cb.args).to.be.deep.equal([
        	[5, 0, iterum],
            [6, 1, iterum],
            [7, 2, iterum],
            [8, 3, iterum],
            [9, 4, iterum],
            [10, 5, iterum]
        ])
    })
})
