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

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.reduceRight([5, 7, 10], (a, b) => a + b, 0)
            expect(result).to.be.equal(22)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.reduceRight({a: 2}, (a, b) => a + b, 0)
            expect(result).to.be.equal(0)
        })
    })
})
