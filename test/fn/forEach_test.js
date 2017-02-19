const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../../src/index.js')

describe('forEach', function () {
    it('traverse all values', function () {
        const cb = sinon.spy()
        const iterable = [5, 6, 7, 8, 9, 10]
        const iterum = Iterum(iterable)
        iterum.forEach(cb)
        expect(cb.args).to.be.deep.equal([
            [5, 0, iterum],
            [6, 1, iterum],
            [7, 2, iterum],
            [8, 3, iterum],
            [9, 4, iterum],
            [10, 5, iterum]
        ])
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            let sum = 0
            Iterum.forEach([5, 7, 10], e => sum += e)
            expect(sum).to.be.equal(22)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            let sum = 0
            Iterum.forEach(Symbol.iterator, e => sum += e)
            expect(sum).to.be.equal(0)
        })
    })
})
