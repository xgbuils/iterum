const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('transpose', function () {
    describe('method', function () {
        it('transpose iterables with the same number of values', function () {
            const iterable = Iterum([
                [1, 2, 3],
                'abc',
                new Set([true, false, null])
            ]).transpose()
            expect([...iterable]).to.be.deep.equal([
                [1, 'a', true],
                [2, 'b', false],
                [3, 'c', null]
            ])
        })

        it('transpose iterables with distinct number of values', function () {
            const iterable = Iterum([
                [1, 2],
                'a',
                new Set([true, false, null])
            ]).transpose()
            expect([...iterable]).to.be.deep.equal([
                [1, 'a', true]
            ])
        })

        it('transpose just one iterable', function () {
            const iterable = Iterum([
                [1, 2, 3]
            ]).transpose()
            expect([...iterable]).to.be.deep.equal([[1], [2], [3]])
        })

        it('transpose zero iterables', function () {
            const iterable = Iterum([]).transpose()
            expect([...iterable]).to.be.deep.equal([])
        })

        describe('wrong arguments', function () {
            it('throws an exception when the first argument is not a function', function () {
                function foo () {
                    Iterum({}).transpose()
                }
                expect(foo).to.throw(TypeError,
                    /^\[object Object\] is not an Iterable instance$/)
            })
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([[1, 2], [3, 4]]).transpose()
            const first = [...iterable]
            const second = [...iterable]
            expect(first.map(e => [...e]))
                .to.be.deep.equal(second.map(e => [...e]))
        })

        describe('iterables within iterable are not consumed on first iteration', function () {
            it('first iterable', function () {
                const iterator = Iterum([[1, 2], [3, 4]])
                    .transpose()[Symbol.iterator]()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })

            it('second iterable', function () {
                const iterator = Iterum([[1, 2], [3, 4]])
                    .transpose()[Symbol.iterator]()
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
            const iterable = Iterum.transpose([[5, 7, 10], [4, 6, 9]])
            expect([...iterable]).to.be.deep.equal([[5, 4], [7, 6], [10, 9]])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.transpose(6)
            }
            expect(test).to.throw(TypeError,
                /^6 is not an Iterable instance$/)
        })
    })
})
