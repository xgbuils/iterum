const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../../src/index.js')

describe('reduce', function () {
    it('returns value', function () {
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
})
