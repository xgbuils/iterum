const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('zip', function () {
    it('zip iterables with the same number of values', function () {
        const iterable = Iterum([1, 2, 3]).zip('abc')
        expect([...iterable]).to.be.deep.equal([
            [1, 'a'],
            [2, 'b'],
            [3, 'c']
        ])
    })

    it('zip iterables with distinct number of values', function () {
        const iterable = Iterum([1, 2]).zip(
            new Set([true, false, null])
        )
        expect([...iterable]).to.be.deep.equal([
            [1, true],
            [2, false]
        ])
    })

    describe('wrong arguments', function () {
        it('zip with 0 iterable params', function () {
            function test () {
                Iterum([1, 2, 3]).zip()
            }
            expect(test).to.throw(TypeError,
                /^undefined is not an Iterable instance$/)
        })
        it('throws an exception when the first argument is not a function', function () {
            function test () {
                Iterum([2, 3]).zip({})
            }
            expect(test).to.throw(TypeError,
                /^\[object Object\] is not an Iterable instance$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.zip([5, 7, 10], [4, 6, 9])
            expect([...iterable]).to.be.deep.equal([[5, 4], [7, 6], [10, 9]])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const iterable = Iterum.zip(new Number(6), [4, 6, 9])
            expect([...iterable]).to.be.deep.equal([])
        })
    })
})
