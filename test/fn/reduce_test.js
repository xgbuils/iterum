var expect = require('chai').expect
var sinon = require('sinon')
var Iterum = require('../../src/index.js')

describe('reduce', function () {
    it('returns value', function () {
        var cb = sinon.spy(function (a, b) {
            return a - b
        })
        var value = Iterum(Iterum([1, 3, 5]))
            .reduce(cb)
        expect(value).to.be.deep.equal(-7)
    })

    it('without initial value', function () {
        var cb = sinon.spy(function (a, b) {
            return a + b
        })
        var iterum = Iterum(Iterum([1, 3, 5]))
        iterum.reduce(cb)
        expect(cb.args).to.be.deep.equal([
            [1, 3, 1, iterum],
            [4, 5, 2, iterum]
        ])
    })

    it('with initial value', function () {
        var cb = sinon.spy(function (a, b) {
            return a + b
        })
        var iterum = Iterum(Iterum([1, 3, 5]))
        iterum.reduce(cb, 0)
        expect(cb.args).to.be.deep.equal([
            [0, 1, 0, iterum],
            [1, 3, 1, iterum],
            [4, 5, 2, iterum]
        ])
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var value = Iterum([1]).repeat(2).repeat(2).repeat(2).reduce(function (a, b) {
                return a + b
            })
            expect(value).to.be.deep.equal(8)
        })
    })
})
