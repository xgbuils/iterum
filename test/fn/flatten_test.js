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

    it('flatten has n = 1 by default', function () {
        const iterable = [[[1], 2], 3, [4, 5], [[6], 7]]
        const expectedIterable = [[1], 2, 3, 4, 5, [6], 7]
        const flattenedIterable = Iterum(iterable)
            .flatten()
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
})
