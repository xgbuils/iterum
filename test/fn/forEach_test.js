const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('forEach', function () {
    it('traverse all values', function () {
        const cb = sinon.spy()
        const iterum = range(5, 10, 1)
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

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            const cb = sinon.spy()
            const iterum = Iterum([5, 10]).repeat(2)
            iterum.forEach(cb)
            expect(cb.args).to.be.deep.equal([
                [5, 0, iterum],
                [10, 1, iterum],
                [5, 2, iterum],
                [10, 3, iterum]
            ])
        })
    })
})
