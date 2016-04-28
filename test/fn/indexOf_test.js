var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('indexOf', function () {
    it('in range iterator between 5 and 10, 7 is in 2 position', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(7)).to.be.deep.equal(2)
    })

    it('in range iterator between 5 and 10, 5 is in 0 position', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(7)).to.be.deep.equal(2)
    })

    it('in range iterator between 5 and 10, 10 is in 5 position', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(7)).to.be.deep.equal(2)
    })

    it('in range iterator between 5 and 10, with 0 it returns -1', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(0)).to.be.deep.equal(-1)
    })
})
