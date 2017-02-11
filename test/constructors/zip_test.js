const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {zip} = Iterum

describe('zip', function () {
    it('zip iterables with the same number of values', function () {
        const zipIterable = [...zip(
            [1, 2, 3],
            'abc',
            new Set([true, false, null])
        )]
        expect([...zipIterable]).to.be.deep.equal([
            [1, 'a', true],
            [2, 'b', false],
            [3, 'c', null]
        ])
    })

    it('zip iterables with distinct number of values', function () {
        const zipIterable = [...zip(
            [1, 2],
            'a',
            new Set([true, false, null])
        )]
        expect([...zipIterable]).to.be.deep.equal([
            [1, 'a', true]
        ])
    })

    it('zip with 0 iterables returns empty', function () {
        const zipIterable = [...zip()]
        expect([...zipIterable]).to.be.deep.equal([])
    })

    it('zip with 1 iterable', function () {
        const zipIterable = [...zip([1, 2, 3])]
        expect([...zipIterable]).to.be.deep.equal([[1], [2], [3]])
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                zip({})
            }
            expect(foo).to.throw(TypeError,
                /^\[object Object\] is not an Iterable instance$/)
        })
    })
})
