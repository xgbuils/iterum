var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('slice', function () {
    it('method returns and Iterum instance', function () {
        var iterator = new Iterum(Range(0, 3, 1))
        expect(iterator.slice(1, 3)).to.be.instanceof(Iterum)
    })

    it('iterator that returns slice', function () {
        var iterator = new Iterum(Range(0, 3, 1))
        expect(iterator.slice(1, 3).toArray()).to.be.deep.equal([1, 2])
    })

    it('iterator that returns slice', function () {
        var iterator = new Iterum(Range(0, 3, 1))
        expect(iterator.slice(1, 100).toArray()).to.be.deep.equal([1, 2, 3])
    })

    it('iterator that returns slice', function () {
        var iterator = new Iterum(Range(0, 3, 1))
        expect(iterator.slice().toArray()).to.be.deep.equal([0, 1, 2, 3])
    })

    it('iterator that returns slice', function () {
        var iterator = new Iterum(Range(0, 3, 1))
        expect(iterator.slice(2).toArray()).to.be.deep.equal([2, 3])
    })
})
