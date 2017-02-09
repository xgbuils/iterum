const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../../src/index.js')

describe('reduceRight', function () {
    it('returns value', function () {
        const cb = sinon.spy(function (a, b) {
            return a - b
        })
        const value = Iterum([1, 3, 5])
            .reduceRight(cb)
        expect(value).to.be.deep.equal(1)
    })

    it('without initial value', function () {
        const cb = sinon.spy(function (a, b) {
            return a + b
        })
        const iterum = Iterum([1, 3, 5])
        iterum.reduceRight(cb)
        expect(cb.args).to.be.deep.equal([
            [5, 3, 1, iterum],
            [8, 1, 0, iterum]
        ])
    })

    it('with initial value', function () {
        const cb = sinon.spy(function (a, b) {
            return a + b
        })
        const iterum = Iterum([1, 3, 5])
        iterum.reduceRight(cb, 0)
        expect(cb.args).to.be.deep.equal([
            [0, 5, 2, iterum],
            [5, 3, 1, iterum],
            [8, 1, 0, iterum]
        ])
    })
})
