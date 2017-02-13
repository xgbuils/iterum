const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('zip', function () {
    it('zip iterables with the same number of values', function () {
        const zipIterable = Iterum([1, 2, 3]).zip(
            'abc',
            new Set([true, false, null])
        )
        expect([...zipIterable]).to.be.deep.equal([
            [1, 'a', true],
            [2, 'b', false],
            [3, 'c', null]
        ])
    })

    it('zip iterables with distinct number of values', function () {
        const zipIterable = Iterum([1, 2]).zip(
            'a',
            new Set([true, false, null])
        )
        expect([...zipIterable]).to.be.deep.equal([
            [1, 'a', true]
        ])
    })

    it('zip with 0 iterable params', function () {
        const zipIterable = Iterum([1, 2, 3]).zip()
        expect([...zipIterable]).to.be.deep.equal([[1], [2], [3]])
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Iterum([2, 3]).zip({})
            }
            expect(foo).to.throw(TypeError,
                /^\[object Object\] is not an Iterable instance$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const zipIterable = Iterum.zip([5, 7, 10], [4, 6, 9])
            expect([...zipIterable]).to.be.deep.equal([[5, 4], [7, 6], [10, 9]])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const zipIterable = Iterum.zip(new Number(6), [4, 6, 9])
            expect([...zipIterable]).to.be.deep.equal([])
        })
    })
})
