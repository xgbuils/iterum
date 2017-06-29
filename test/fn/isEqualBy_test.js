const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.isEqualBy', function () {
    describe('method', function () {
        it('returns true if every value of iterables is equal after applying the callback', function () {
            const a = ['12', '2.1', 'abc']
            const b = [12, '2.3', 'cba']
            expect(Iterum(a).isEqualBy(parseInt, b)).to.be.equal(true)
        })

        it('returns false if some value of iterables is not equal after applying the callback', function () {
            const a = ['12', '1.9', 'abc']
            const b = [12, '2.3', 'cba']
            expect(Iterum(a).isEqualBy(parseInt, b)).to.be.equal(false)
        })

        it('returns false if iterables has different number of values', function () {
            const a = ['12', '2.8', 'abc', 7]
            const b = [12, '2.3', 'cba']
            expect(Iterum(a).isEqualBy(parseInt, b)).to.be.equal(false)
        })

        describe('inmutability', function () {
            it('isEqualBy method does not mutate iterable object', function () {
                const a = [1, 6, 3]
                const b = [6, 8, 4]
                const x = Iterum(a)
                x.isEqualBy(e => typeof e, b)
                expect([...x]).to.be.deep.equal([...a])
            })
        })
    })

    describe('function', function () {
        let a
        let b
        beforeEach(function () {
            a = [() => 1, 2, '3']
            b = [e => e, Infinity, {}]
        })
        it('normal behaviour', function () {
            const result = Iterum.isEqualBy(e => typeof e, a, b)
            expect(result).to.be.equal(false)
        })

        it('throws an exception if first parameter is not a function', function () {
            function test () {
                Iterum.isEqualBy(false, a, b)
            }
            expect(test).to.throw(TypeError,
                /^false is not a function$/)
        })

        it('returns false if second parameter is not an iterable', function () {
            const result = Iterum.isEqualBy(e => typeof e, {}, b)
            expect(result).to.be.equal(false)
        })

        it('returns false if third parameter is not an iterable', function () {
            const result = Iterum.isEqualBy(e => typeof e, a, 5)
            expect(result).to.be.equal(false)
        })
    })
})
