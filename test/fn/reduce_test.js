const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../../src/index.js')

describe('reduce', function () {
    it('returns correct value', function () {
        const cb = sinon.spy(function (a, b) {
            return a - b
        })
        const value = Iterum(Iterum([1, 3, 5]))
            .reduce(cb)
        expect(value).to.be.deep.equal(-7)
    })

    it('without initial value', function () {
        const cb = sinon.spy(function (a, b) {
            return a + b
        })
        const iterum = Iterum(Iterum([1, 3, 5]))
        iterum.reduce(cb)
        expect(cb.args).to.be.deep.equal([
            [1, 3, 1, iterum],
            [4, 5, 2, iterum]
        ])
    })

    it('with initial value', function () {
        const cb = sinon.spy(function (a, b) {
            return a + b
        })
        const iterum = Iterum(Iterum([1, 3, 5]))
        iterum.reduce(cb, 0)
        expect(cb.args).to.be.deep.equal([
            [0, 1, 0, iterum],
            [1, 3, 1, iterum],
            [4, 5, 2, iterum]
        ])
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.reduce([5, 7, 10], (a, b) => a + b, 0)
            expect(result).to.be.equal(22)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.reduce(42, (a, b) => a + b, 0)
            expect(result).to.be.equal(0)
        })
    })
})
