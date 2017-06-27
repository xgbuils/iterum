const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('flatten', function () {
    it('flatten 0 returns iterable that iterate over the same values', function () {
        const iterable = [1, [2, 3, 4], 5]
        const nonFlattenedIterable = Iterum(iterable)
            .flatten(0)
        expect([...nonFlattenedIterable]).to.be.deep.equal([...iterable])
    })

    it('flatten (n = 1)', function () {
        const iterable = [[[1], 2], 3, [4, 5], [[6], 7]]
        const expectedIterable = [[1], 2, 3, 4, 5, [6], 7]
        const flattenedIterable = Iterum(iterable)
            .flatten(1)
        expect([...flattenedIterable]).to.be.deep.equal([...expectedIterable])
    })

    it('flatten (n = 4)', function () {
        const iterable = [1, [2, [3, [4, [5, [6, [7]]]]]]]
        const expectedIterable = [1, 2, 3, 4, 5, [6, [7]]]
        const flattenedIterable = Iterum(iterable)
            .flatten(4)
        expect([...flattenedIterable]).to.be.deep.equal([...expectedIterable])
    })

    it('flatten (n = Infinity)', function () {
        const iterable = [[[[[[[7], 6], 5], 4], 3], 2], 1, [2, [3, [4, [5, [6, [7]]]]]]]
        const expectedIterable = [7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7]
        const flattenedIterable = Iterum(iterable)
            .flatten(Infinity)
        expect([...flattenedIterable]).to.be.deep.equal([...expectedIterable])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [2, [3, 4], 5]
            const iterable = Iterum(a).flatten(1)
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterable])
        })
    })

    describe('inmutability', function () {
        it('filter method does not mutate iterable object', function () {
            const a = [2, [3, 4], 5]
            const iterable = Iterum(a)
            iterable.flatten(1)
            expect([...iterable]).to.be.deep.equal([...a])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception if are not passed parameters', function () {
            const iterable = [[[1], 2], 3, [4, 5], [[6], 7]]
            function test () {
                Iterum(iterable).flatten()
            }
            expect(test).to.throw(TypeError,
                /^undefined is not a number$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const flattenIterable = Iterum.flatten([5, 'abc', 10], 1)
            expect([...flattenIterable]).to.be.deep.equal([5, ...'abc', 10])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.flatten(undefined, 1)
            }
            expect(test).to.throw(TypeError,
                /^undefined is not an Iterable instance$/)
        })
    })
})
