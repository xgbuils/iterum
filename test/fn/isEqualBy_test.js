const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.isEqualBy', function () {
    it('returns true if every value of iterables is equal after applying the callback', function () {
        const a = ['12', '2.1', 'abc']
        const b = [12, '2.3', 'cba']
        expect(Iterum(a).isEqualBy(b, parseInt)).to.be.equal(true)
    })

    it('returns false if some value of iterables is not equal after applying the callback', function () {
        const a = ['12', '1.9', 'abc']
        const b = [12, '2.3', 'cba']
        expect(Iterum(a).isEqualBy(b, parseInt)).to.be.equal(false)
    })

    it('returns false if iterables has different number of values', function () {
        const a = ['12', '2.8', 'abc', 7]
        const b = [12, '2.3', 'cba']
        expect(Iterum(a).isEqualBy(b, parseInt)).to.be.equal(false)
    })

    describe('inmutability', function () {
        it('isEqualBy method does not mutate iterable object', function () {
            const a = [1, 6, 3]
            const b = [6, 8, 4]
            const x = Iterum(a)
            x.isEqualBy(b, e => typeof e)
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const a = [() => 1, 2, '3']
            const b = [e => e, Infinity, {}]
            const result = Iterum.isEqualBy(a, b, e => typeof e)
            expect(result).to.be.equal(false)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.isEqualBy(false, [5], e => 2 * e)
            expect(result).to.be.equal(false)
        })
    })
})
