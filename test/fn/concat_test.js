var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Value = Iterum.Build.Empty
var Range = Iterum.Build.Range
var Empty = Iterum.Build.Empty

describe('concat', function () {
    it('method returns and Iterum instance', function () {
        var a = new Iterum(Range(0, 3, 1))
        var b = new Iterum(Value(2))
        expect(a.concat(b)).to.be.instanceof(Iterum)
    })

    it('given two no empty iterators returns iterator concatenation', function () {
        var a = new Iterum(Range(0, 3, 1))
        var b = new Iterum(Range(4, 16, 4))
        expect(a.concat(b).toArray()).to.be.deep.equal([0, 1, 2, 3, 4, 8, 12, 16])
    })

    it('concatenating empty iterator with no empty iterator works well', function () {
        var a = new Iterum(Empty())
        var b = new Iterum(Range(4, 16, 4))
        expect(a.concat(b).toArray()).to.be.deep.equal([4, 8, 12, 16])
    })

    it('concatenating no empty iterator with empty iterator works well', function () {
        var a = new Iterum(Range(0, 3, 1))
        var b = new Iterum(Empty())
        expect(a.concat(b).toArray()).to.be.deep.equal([0, 1, 2, 3])
    })

    it('concatenating empty iterator with empty iterator works well', function () {
        var a = new Iterum(Empty())
        var b = new Iterum(Empty())
        expect(a.concat(b).toArray()).to.be.deep.equal([])
    })
})
