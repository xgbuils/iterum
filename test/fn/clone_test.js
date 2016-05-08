var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var List = Iterum.List
var Value = Iterum.Value

describe('clone', function () {
    describe('behaviour without using clone', function () {
        it('mutates when are called its methods', function () {
            var x = Iterum(List([0, 3, 1]))
            var y = x
            x.concat(Value(4))
            expect(y.toArray()).to.be.deep.equal([0, 3, 1, 4])
        })
    })

    describe('behaviour using clone', function () {
        it('does not mutate when are called its methods', function () {
            var x = Iterum(List([0, 3, 1]))
            var y = x.clone()
            x.concat(Value(4))
            expect(y.toArray()).to.be.deep.equal([0, 3, 1])
        })

        it('regresion behaviour', function () {
            var x = Iterum(List([0, 3, 1]))
            var y = x.clone()
            x.concat(Value(4))
            expect(x.toArray()).to.be.deep.equal([0, 3, 1, 4])
            expect(y.toArray()).to.be.deep.equal([0, 3, 1])
        })
    })
})
