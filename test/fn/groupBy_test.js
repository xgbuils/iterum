const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('.groupBy', function () {
    describe('method', function () {
        describe('given empty iterable', function () {
            it('returns an empty iterable', function () {
                const iterable = Iterum([]).groupBy(e => e)
                expect([...iterable].map(group => [...group])).to.be.deep.equal([])
            })
        })

        describe('given an iterable with just one element', function () {
            it('returns an iterable with one group', function () {
                const num = 1
                const iterable = Iterum([num]).groupBy(e => e)
                expect([...iterable].map(group => [...group])).to.be.deep.equal([[num]])
            })
        })

        describe('given an iterable with two distinct elements', function () {
            it('first group has the first element', function () {
                const a = 1
                const b = 2
                const iterable = Iterum([a, b]).groupBy(e => e)
                const firstGroup = iterable[Symbol.iterator]().next().value
                expect([...firstGroup]).to.be.deep.equal([a])
            })

            it('second group has the second element', function () {
                const a = 1
                const b = 2
                const iterable = Iterum([a, b]).groupBy(e => e)
                const iterator = iterable[Symbol.iterator]()
                iterator.next()
                const secondGroup = iterator.next().value
                expect([...secondGroup]).to.be.deep.equal([b])
            })
        })

        describe('given an iterable with two elements which are equal', function () {
            it('the first element of first group is equal to this elements', function () {
                const a = 1
                const iterable = Iterum([a, a]).groupBy(e => e)
                const firstGroup = iterable[Symbol.iterator]().next().value
                const firstElement = firstGroup[Symbol.iterator]().next().value
                expect(firstElement).to.be.equal(a)
            })

            it('the second element of first group is equal to this elements', function () {
                const a = 1
                const iterable = Iterum([a, a]).groupBy(e => e)
                const firstGroup = iterable[Symbol.iterator]().next().value
                const iterator = firstGroup[Symbol.iterator]()
                iterator.next()
                const secondElement = iterator.next().value
                expect(secondElement).to.be.equal(a)
            })
        })

        it('filters values that are equal by sameValueZero applying e => e % 3', function () {
            const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const iterable = Iterum(a).groupBy(e => e % 3)
            expect([...iterable].map(e => [...e])).to.be.deep.equal([
                [1, 4, 7, 10],
                [2, 5, 8],
                [3, 6, 9]
            ])
        })

        it('filters values that are equal by sameValueZero applying parseInt', function () {
            const a = ['abc', '2.3', '3.5', '2.1', 'cba']
            const iterable = Iterum(a).groupBy(parseInt)
            expect([...iterable].map(e => [...e])).to.be.deep.equal([
                ['abc', 'cba'],
                ['2.3', '2.1'],
                ['3.5']
            ])
        })

        it('returned value is an iterum instance and can be chained with other methods', function () {
            const a = ['abc', '2.3', '3.5', '2.1', 'cba']
            const iterable = Iterum(a).groupBy(parseInt)
                .map(e => e.take(1))
            expect([...iterable].map(e => [...e])).to.be.deep.equal([['abc'], ['2.3'], ['3.5']])
        })

        describe('given infinite iterable', function () {
            it('groupBy does not produces infinite loops if is combined with another lazy method', function () {
                const iterable = range(0, Infinity).groupBy(e => e % 3)
                    .take(3)
                    .map(group => group.take(2))
                expect([...iterable].map(group => [...group]))
                    .to.be.deep.equal([
                        [0, 3],
                        [1, 4],
                        [2, 5]
                    ])
            })
        })

        describe('inmutability', function () {
            it('groupBy method does not mutate object', function () {
                const a = new Set([1, 6, 3, 6, 8, 4])
                const x = Iterum(a)
                x.groupBy(e => e % 3)
                expect([...x]).to.be.deep.equal([...a])
            })
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([1, 2, 3, 4])
                .groupBy(e => e % 2)
            const first = [...iterable]
            const second = [...iterable]
            expect(first.map(e => [...e]))
                .to.be.deep.equal(second.map(e => [...e]))
        })

        describe('iterables within iterable are not consumed on first iteration', function () {
            it('first iterable', function () {
                const iterator = Iterum([1, 2, 3, 4])
                    .groupBy(e => e % 2)[Symbol.iterator]()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })

            it('second iterable', function () {
                const iterator = Iterum([1, 2, 3, 4])
                    .groupBy(e => e % 2)[Symbol.iterator]()
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
            const iterable = Iterum.groupBy(
                e => e * e % 5,
                [1, 9, 6, 3, 6, 0, 2, 8, 5, 4, 7]
            )
            expect([...iterable].map(e => [...e])).to.be.deep.equal([
                [1, 9, 6, 6, 4],
                [3, 2, 8, 7],
                [0, 5]
            ])
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.groupBy(null, [1, 9, 6, 3, 6, 0, 2, 8, 5, 4, 7])
            }
            expect(test).to.throw(TypeError,
                /^null is not a function$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.groupBy(e => e % 3, null)
            }
            expect(test).to.throw(TypeError,
                /^null is not an iterable$/)
        })
    })
})
