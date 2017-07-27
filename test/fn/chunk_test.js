const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum
const {toNestedArray, toArray} = require('../utils/')

describe('.chunk', function () {
    describe('method', function () {
        describe('iterable chunked over 0', function () {
            it('returns an empty iterable', function () {
                const iterable = Iterum([3, 2, 1]).chunk(0)
                expect(toNestedArray(iterable)).to.be.deep.equal([])
            })
        })
        describe('given empty iterable', function () {
            it('returns an empty iterable', function () {
                const iterable = Iterum([]).chunk(3)
                expect(toNestedArray(iterable)).to.be.deep.equal([])
            })
        })

        describe('given an iterable with just one element', function () {
            it('returns an iterable with one group', function () {
                const num = 3
                const iterable = Iterum([num]).chunk(2)
                expect(toNestedArray(iterable)).to.be.deep.equal([[num]])
            })
        })

        describe('given an iterable of 7 elements over chunk of 3', function () {
            it('iterate over first chunk', function () {
                const iterable = range(0, 6).chunk(3)
                const iterator = iterable[Symbol.iterator]()
                const firstChunk = iterator.next().value
                expect(toArray(firstChunk)).to.be.deep.equal([0, 1, 2])
            })

            it('iterate over second chunk', function () {
                const iterable = range(0, 6).chunk(3)
                const iterator = iterable[Symbol.iterator]()
                iterator.next()
                const secondChunk = iterator.next().value
                expect(toArray(secondChunk)).to.be.deep.equal([3, 4, 5])
            })

            it('iterate over third chunk', function () {
                const iterable = range(0, 6).chunk(3)
                const iterator = iterable[Symbol.iterator]()
                iterator.next()
                iterator.next()
                const thirdChunk = iterator.next().value
                expect(toArray(thirdChunk)).to.be.deep.equal([6])
            })

            it('iterate over first chunk after iterating over third chunk', function () {
                const iterable = range(0, 6).chunk(3)
                const iterator = iterable[Symbol.iterator]()
                const firstChunk = iterator.next().value
                iterator.next()
                const thirdChunk = iterator.next().value
                toArray(thirdChunk)
                expect(toArray(firstChunk)).to.be.deep.equal([0, 1, 2])
            })
        })

        it('returned value is an iterum instance and can be chained with other methods', function () {
            const a = ['abc', '2.3', '3.5', '2.1', 'cba']
            const iterable = Iterum(a).chunk(2)
                .map(e => e.take(1))
            expect(toNestedArray(iterable)).to.be.deep.equal([['abc'], ['3.5'], ['cba']])
        })

        it('works with infinite iterables', function () {
            const iterable = range(0, Infinity).chunk(4)
                .take(3)
                .map(group => group.take(2))
            expect(toNestedArray(iterable))
                .to.be.deep.equal([
                    [0, 1],
                    [4, 5],
                    [8, 9]
                ])
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([1, 2, 3, 4])
                .chunk(2)
            const first = toNestedArray(iterable)
            const second = toNestedArray(iterable)
            expect(first)
                .to.be.deep.equal(second)
        })

        describe('iterables within iterable are not consumed on first iteration', function () {
            it('first iterable', function () {
                const iterator = Iterum([1, 2, 3, 4])
                    .chunk(2)[Symbol.iterator]()
                const nestedIterable = iterator.next().value
                const first = toArray(nestedIterable)
                const second = toArray(nestedIterable)
                expect(first).to.be.deep.equal(second)
            })

            it('second iterable', function () {
                const iterator = Iterum([1, 2, 3, 4])
                    .chunk(2)[Symbol.iterator]()
                iterator.next()
                const nestedIterable = iterator.next().value
                const first = toArray(nestedIterable)
                const second = toArray(nestedIterable)
                expect(first).to.be.deep.equal(second)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.chunk(3,
                [1, 9, 6, 3, 6, 0, 2, 8, 5, 4, 7]
            )
            expect(toNestedArray(iterable)).to.be.deep.equal([
                [1, 9, 6],
                [3, 6, 0],
                [2, 8, 5],
                [4, 7]
            ])
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.chunk(null, [1, 9, 6, 3, 6, 0, 2, 8, 5, 4, 7])
            }
            expect(test).to.throw(TypeError,
                /^null is not a number$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.chunk(3, null)
            }
            expect(test).to.throw(TypeError,
                /^null is not an iterable$/)
        })
    })
})
