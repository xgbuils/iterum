const {expect} = require('chai')
const Iterum = require('../src/')

describe('transposeLongest', function () {
    describe('method', function () {
        it('transposeLongest iterables with the same number of values', function () {
            const iterable = Iterum([
                [1, 2, 3],
                'abc',
                new Set([true, false, null])
            ]).transposeLongest()
            expect([...iterable]).to.be.deep.equal([
                [1, 'a', true],
                [2, 'b', false],
                [3, 'c', null]
            ])
        })

        it('transposeLongest iterables with distinct number of values', function () {
            const iterable = Iterum([
                [1, 2],
                'a',
                new Set([true, false, null])
            ]).transposeLongest()
            expect([...iterable]).to.be.deep.equal([
                [1, 'a', true],
                [2, undefined, false],
                [undefined, undefined, null]
            ])
        })

        it('transposeLongest just one iterable', function () {
            const iterable = Iterum([
                [1, 2, 3]
            ]).transposeLongest()
            expect([...iterable]).to.be.deep.equal([[1], [2], [3]])
        })

        it('transposeLongest zero iterables', function () {
            const iterable = Iterum([]).transposeLongest()
            expect([...iterable]).to.be.deep.equal([])
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([[1, 2], [3, 4]]).transposeLongest()
            const first = [...iterable]
            const second = [...iterable]
            expect(first.map(e => [...e]))
                .to.be.deep.equal(second.map(e => [...e]))
        })

        describe('iterables within iterable are not consumed on first iteration', function () {
            it('first iterable', function () {
                const iterator = Iterum([[1, 2], [3, 4]])
                    .transposeLongest()[Symbol.iterator]()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })

            it('second iterable', function () {
                const iterator = Iterum([[1, 2], [3, 4]])
                    .transposeLongest()[Symbol.iterator]()
                iterator.next()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.transposeLongest([[5, 7, 10], [4, 6, 9]])
            expect([...iterable]).to.be.deep.equal([[5, 4], [7, 6], [10, 9]])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.transposeLongest(6)
            }
            expect(test).to.throw(TypeError,
                /^6 is not an iterable$/)
        })
    })
})
