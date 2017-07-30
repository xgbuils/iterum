const {expect} = require('chai')
const Iterum = require('../src/')

describe('isEmpty', function () {
    describe('method', function () {
        it('returns true with empty iterable', function () {
            const iterable = new Set()
            const result = Iterum(iterable).isEmpty()
            expect(result).to.be.equal(true)
        })

        it('returns false with no empty iterable', function () {
            const iterable = new Set([1, 2, 3])
            const result = Iterum(iterable).isEmpty()
            expect(result).to.be.equal(false)
        })

        describe('iterating over iterum instance', function () {
            it('does not mutate the behaviour of every', function () {
                const iterable = [3]
                const iterum = Iterum(iterable)
                const predicate = e => e < 10
                let result = true
                for (const _ of iterum) { // eslint-disable-line no-unused-vars
                    result = false
                }
                expect(iterum.isEmpty(predicate)).to.be.deep.equal(result)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.isEmpty([5, 7, 10])
            expect(result).to.be.equal(false)
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.isEmpty(true)
            }
            expect(test).to.throw(TypeError,
                /^true is not an iterable$/)
        })
    })
})
