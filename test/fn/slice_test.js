var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('slice', function () {
    it('iterator that returns slice', function () {
        var values = Iterum(Range(0, 3, 1))
            .slice(1, 3)
            .toArray()
        expect(values).to.be.deep.equal([1, 2])
    })

    it('iterator that returns slice', function () {
        var values = Iterum(Range(0, 3, 1))
            .slice(1, 100)
            .toArray()
        expect(values).to.be.deep.equal([1, 2, 3])
    })

    it('iterator that returns slice', function () {
        var values = Iterum(Range(0, 3, 1))
            .slice()
            .toArray()
        expect(values).to.be.deep.equal([0, 1, 2, 3])
    })

    it('iterator that returns slice', function () {
        var values = Iterum(Range(0, 3, 1))
            .slice(2)
            .toArray()
        expect(values).to.be.deep.equal([2, 3])
    })
})
