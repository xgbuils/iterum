const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('toString', function () {
    describe('method', function () {
        it('empty iterable', function () {
            const iterable = Iterum([])
            expect(iterable.toString()).to.be.equal('()')
        })

        it('iterable of 4 values', function () {
            const iterable = Iterum([0, 1, 2, 8])
            expect(`${iterable}`).to.be.equal('(0 1 2 8)')
        })

        it('iterable of 10 values', function () {
            const iterable = range(1, 10)
            expect(iterable.toString()).to.be.equal('(1 2 3 4 5 6 7 8 9 10)')
        })

        it('iterable of more than 10 values', function () {
            const iterable = range(0, 10)
            expect(iterable.toString()).to.be.equal('(0 1 2 3 4 5 6 7 8 9...)')
        })

        it('infinite iterable', function () {
            const iterable = range(0, Infinity)
            expect(iterable.toString()).to.be.equal('(0 1 2 3 4 5 6 7 8 9...)')
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum([5, 7, 10])
            expect(`${iterable}`).to.be.equal('(5 7 10)')
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.toString(false)
            }
            expect(test).to.throw(TypeError,
                /^false is not an iterable$/)
        })
    })
})
