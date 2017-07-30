const {expect} = require('chai')
const Iterum = require('../src/')
const {range} = Iterum

describe('.permutations', function () {
    describe('method', function () {
        context('empty iterable', function () {
            it('returns an iterable that iterates over the same values', function () {
                const a = []
                const iterable = Iterum(a).permutations()
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    []
                ])
            })
        })
        context('iterable with 1 value', function () {
            it('returns an iterable that iterates over the same values', function () {
                const a = [4]
                const iterable = Iterum(a).permutations()
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [4]
                ])
            })
        })
        context('iterable with 2 values', function () {
            it('returns an iterable with the permutations of iterable object', function () {
                const a = [5, 9]
                const iterable = Iterum(a).permutations()
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [5, 9],
                    [9, 5]
                ])
            })
        })
        context('iterable with 3 values', function () {
            it('returns an iterable with the permutations of iterable object', function () {
                const a = [3, 2, 1]
                const iterable = Iterum(a).permutations()
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [3, 2, 1],
                    [2, 3, 1],
                    [3, 1, 2],
                    [1, 3, 2],
                    [2, 1, 3],
                    [1, 2, 3]
                ])
            })
        })
        context('iterable with 6 values', function () {
            it('returns an iterable with the permutations of iterable object (testing firsts 241 items)', function () {
                const a = [6, 5, 4, 3, 2, 1]
                const iterable = Iterum(a).permutations()
                    .slice(0, 241)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [6, 5, 4, 3, 2, 1],
                    [5, 6, 4, 3, 2, 1],
                    [6, 4, 5, 3, 2, 1],
                    [4, 6, 5, 3, 2, 1],
                    [5, 4, 6, 3, 2, 1],
                    [4, 5, 6, 3, 2, 1],
                    [6, 5, 3, 4, 2, 1],
                    [5, 6, 3, 4, 2, 1],
                    [6, 3, 5, 4, 2, 1],
                    [3, 6, 5, 4, 2, 1],
                    [5, 3, 6, 4, 2, 1],
                    [3, 5, 6, 4, 2, 1],
                    [6, 4, 3, 5, 2, 1],
                    [4, 6, 3, 5, 2, 1],
                    [6, 3, 4, 5, 2, 1],
                    [3, 6, 4, 5, 2, 1],
                    [4, 3, 6, 5, 2, 1],
                    [3, 4, 6, 5, 2, 1],
                    [5, 4, 3, 6, 2, 1],
                    [4, 5, 3, 6, 2, 1],
                    [5, 3, 4, 6, 2, 1],
                    [3, 5, 4, 6, 2, 1],
                    [4, 3, 5, 6, 2, 1],
                    [3, 4, 5, 6, 2, 1],
                    [6, 5, 4, 2, 3, 1],
                    [5, 6, 4, 2, 3, 1],
                    [6, 4, 5, 2, 3, 1],
                    [4, 6, 5, 2, 3, 1],
                    [5, 4, 6, 2, 3, 1],
                    [4, 5, 6, 2, 3, 1],
                    [6, 5, 2, 4, 3, 1],
                    [5, 6, 2, 4, 3, 1],
                    [6, 2, 5, 4, 3, 1],
                    [2, 6, 5, 4, 3, 1],
                    [5, 2, 6, 4, 3, 1],
                    [2, 5, 6, 4, 3, 1],
                    [6, 4, 2, 5, 3, 1],
                    [4, 6, 2, 5, 3, 1],
                    [6, 2, 4, 5, 3, 1],
                    [2, 6, 4, 5, 3, 1],
                    [4, 2, 6, 5, 3, 1],
                    [2, 4, 6, 5, 3, 1],
                    [5, 4, 2, 6, 3, 1],
                    [4, 5, 2, 6, 3, 1],
                    [5, 2, 4, 6, 3, 1],
                    [2, 5, 4, 6, 3, 1],
                    [4, 2, 5, 6, 3, 1],
                    [2, 4, 5, 6, 3, 1],
                    [6, 5, 3, 2, 4, 1],
                    [5, 6, 3, 2, 4, 1],
                    [6, 3, 5, 2, 4, 1],
                    [3, 6, 5, 2, 4, 1],
                    [5, 3, 6, 2, 4, 1],
                    [3, 5, 6, 2, 4, 1],
                    [6, 5, 2, 3, 4, 1],
                    [5, 6, 2, 3, 4, 1],
                    [6, 2, 5, 3, 4, 1],
                    [2, 6, 5, 3, 4, 1],
                    [5, 2, 6, 3, 4, 1],
                    [2, 5, 6, 3, 4, 1],
                    [6, 3, 2, 5, 4, 1],
                    [3, 6, 2, 5, 4, 1],
                    [6, 2, 3, 5, 4, 1],
                    [2, 6, 3, 5, 4, 1],
                    [3, 2, 6, 5, 4, 1],
                    [2, 3, 6, 5, 4, 1],
                    [5, 3, 2, 6, 4, 1],
                    [3, 5, 2, 6, 4, 1],
                    [5, 2, 3, 6, 4, 1],
                    [2, 5, 3, 6, 4, 1],
                    [3, 2, 5, 6, 4, 1],
                    [2, 3, 5, 6, 4, 1],
                    [6, 4, 3, 2, 5, 1],
                    [4, 6, 3, 2, 5, 1],
                    [6, 3, 4, 2, 5, 1],
                    [3, 6, 4, 2, 5, 1],
                    [4, 3, 6, 2, 5, 1],
                    [3, 4, 6, 2, 5, 1],
                    [6, 4, 2, 3, 5, 1],
                    [4, 6, 2, 3, 5, 1],
                    [6, 2, 4, 3, 5, 1],
                    [2, 6, 4, 3, 5, 1],
                    [4, 2, 6, 3, 5, 1],
                    [2, 4, 6, 3, 5, 1],
                    [6, 3, 2, 4, 5, 1],
                    [3, 6, 2, 4, 5, 1],
                    [6, 2, 3, 4, 5, 1],
                    [2, 6, 3, 4, 5, 1],
                    [3, 2, 6, 4, 5, 1],
                    [2, 3, 6, 4, 5, 1],
                    [4, 3, 2, 6, 5, 1],
                    [3, 4, 2, 6, 5, 1],
                    [4, 2, 3, 6, 5, 1],
                    [2, 4, 3, 6, 5, 1],
                    [3, 2, 4, 6, 5, 1],
                    [2, 3, 4, 6, 5, 1],
                    [5, 4, 3, 2, 6, 1],
                    [4, 5, 3, 2, 6, 1],
                    [5, 3, 4, 2, 6, 1],
                    [3, 5, 4, 2, 6, 1],
                    [4, 3, 5, 2, 6, 1],
                    [3, 4, 5, 2, 6, 1],
                    [5, 4, 2, 3, 6, 1],
                    [4, 5, 2, 3, 6, 1],
                    [5, 2, 4, 3, 6, 1],
                    [2, 5, 4, 3, 6, 1],
                    [4, 2, 5, 3, 6, 1],
                    [2, 4, 5, 3, 6, 1],
                    [5, 3, 2, 4, 6, 1],
                    [3, 5, 2, 4, 6, 1],
                    [5, 2, 3, 4, 6, 1],
                    [2, 5, 3, 4, 6, 1],
                    [3, 2, 5, 4, 6, 1],
                    [2, 3, 5, 4, 6, 1],
                    [4, 3, 2, 5, 6, 1],
                    [3, 4, 2, 5, 6, 1],
                    [4, 2, 3, 5, 6, 1],
                    [2, 4, 3, 5, 6, 1],
                    [3, 2, 4, 5, 6, 1],
                    [2, 3, 4, 5, 6, 1],
                    [6, 5, 4, 3, 1, 2],
                    [5, 6, 4, 3, 1, 2],
                    [6, 4, 5, 3, 1, 2],
                    [4, 6, 5, 3, 1, 2],
                    [5, 4, 6, 3, 1, 2],
                    [4, 5, 6, 3, 1, 2],
                    [6, 5, 3, 4, 1, 2],
                    [5, 6, 3, 4, 1, 2],
                    [6, 3, 5, 4, 1, 2],
                    [3, 6, 5, 4, 1, 2],
                    [5, 3, 6, 4, 1, 2],
                    [3, 5, 6, 4, 1, 2],
                    [6, 4, 3, 5, 1, 2],
                    [4, 6, 3, 5, 1, 2],
                    [6, 3, 4, 5, 1, 2],
                    [3, 6, 4, 5, 1, 2],
                    [4, 3, 6, 5, 1, 2],
                    [3, 4, 6, 5, 1, 2],
                    [5, 4, 3, 6, 1, 2],
                    [4, 5, 3, 6, 1, 2],
                    [5, 3, 4, 6, 1, 2],
                    [3, 5, 4, 6, 1, 2],
                    [4, 3, 5, 6, 1, 2],
                    [3, 4, 5, 6, 1, 2],
                    [6, 5, 4, 1, 3, 2],
                    [5, 6, 4, 1, 3, 2],
                    [6, 4, 5, 1, 3, 2],
                    [4, 6, 5, 1, 3, 2],
                    [5, 4, 6, 1, 3, 2],
                    [4, 5, 6, 1, 3, 2],
                    [6, 5, 1, 4, 3, 2],
                    [5, 6, 1, 4, 3, 2],
                    [6, 1, 5, 4, 3, 2],
                    [1, 6, 5, 4, 3, 2],
                    [5, 1, 6, 4, 3, 2],
                    [1, 5, 6, 4, 3, 2],
                    [6, 4, 1, 5, 3, 2],
                    [4, 6, 1, 5, 3, 2],
                    [6, 1, 4, 5, 3, 2],
                    [1, 6, 4, 5, 3, 2],
                    [4, 1, 6, 5, 3, 2],
                    [1, 4, 6, 5, 3, 2],
                    [5, 4, 1, 6, 3, 2],
                    [4, 5, 1, 6, 3, 2],
                    [5, 1, 4, 6, 3, 2],
                    [1, 5, 4, 6, 3, 2],
                    [4, 1, 5, 6, 3, 2],
                    [1, 4, 5, 6, 3, 2],
                    [6, 5, 3, 1, 4, 2],
                    [5, 6, 3, 1, 4, 2],
                    [6, 3, 5, 1, 4, 2],
                    [3, 6, 5, 1, 4, 2],
                    [5, 3, 6, 1, 4, 2],
                    [3, 5, 6, 1, 4, 2],
                    [6, 5, 1, 3, 4, 2],
                    [5, 6, 1, 3, 4, 2],
                    [6, 1, 5, 3, 4, 2],
                    [1, 6, 5, 3, 4, 2],
                    [5, 1, 6, 3, 4, 2],
                    [1, 5, 6, 3, 4, 2],
                    [6, 3, 1, 5, 4, 2],
                    [3, 6, 1, 5, 4, 2],
                    [6, 1, 3, 5, 4, 2],
                    [1, 6, 3, 5, 4, 2],
                    [3, 1, 6, 5, 4, 2],
                    [1, 3, 6, 5, 4, 2],
                    [5, 3, 1, 6, 4, 2],
                    [3, 5, 1, 6, 4, 2],
                    [5, 1, 3, 6, 4, 2],
                    [1, 5, 3, 6, 4, 2],
                    [3, 1, 5, 6, 4, 2],
                    [1, 3, 5, 6, 4, 2],
                    [6, 4, 3, 1, 5, 2],
                    [4, 6, 3, 1, 5, 2],
                    [6, 3, 4, 1, 5, 2],
                    [3, 6, 4, 1, 5, 2],
                    [4, 3, 6, 1, 5, 2],
                    [3, 4, 6, 1, 5, 2],
                    [6, 4, 1, 3, 5, 2],
                    [4, 6, 1, 3, 5, 2],
                    [6, 1, 4, 3, 5, 2],
                    [1, 6, 4, 3, 5, 2],
                    [4, 1, 6, 3, 5, 2],
                    [1, 4, 6, 3, 5, 2],
                    [6, 3, 1, 4, 5, 2],
                    [3, 6, 1, 4, 5, 2],
                    [6, 1, 3, 4, 5, 2],
                    [1, 6, 3, 4, 5, 2],
                    [3, 1, 6, 4, 5, 2],
                    [1, 3, 6, 4, 5, 2],
                    [4, 3, 1, 6, 5, 2],
                    [3, 4, 1, 6, 5, 2],
                    [4, 1, 3, 6, 5, 2],
                    [1, 4, 3, 6, 5, 2],
                    [3, 1, 4, 6, 5, 2],
                    [1, 3, 4, 6, 5, 2],
                    [5, 4, 3, 1, 6, 2],
                    [4, 5, 3, 1, 6, 2],
                    [5, 3, 4, 1, 6, 2],
                    [3, 5, 4, 1, 6, 2],
                    [4, 3, 5, 1, 6, 2],
                    [3, 4, 5, 1, 6, 2],
                    [5, 4, 1, 3, 6, 2],
                    [4, 5, 1, 3, 6, 2],
                    [5, 1, 4, 3, 6, 2],
                    [1, 5, 4, 3, 6, 2],
                    [4, 1, 5, 3, 6, 2],
                    [1, 4, 5, 3, 6, 2],
                    [5, 3, 1, 4, 6, 2],
                    [3, 5, 1, 4, 6, 2],
                    [5, 1, 3, 4, 6, 2],
                    [1, 5, 3, 4, 6, 2],
                    [3, 1, 5, 4, 6, 2],
                    [1, 3, 5, 4, 6, 2],
                    [4, 3, 1, 5, 6, 2],
                    [3, 4, 1, 5, 6, 2],
                    [4, 1, 3, 5, 6, 2],
                    [1, 4, 3, 5, 6, 2],
                    [3, 1, 4, 5, 6, 2],
                    [1, 3, 4, 5, 6, 2],
                    [6, 5, 4, 2, 1, 3]
                ])
            })
        })

        describe('infinite iterables', function () {
            it('works without infinite loops', function () {
                const naturals = range(0, Infinity)
                const iterable = naturals.permutations()
                    .map(perm => perm.take(5))
                    .take(7)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [0, 1, 2, 3, 4],
                    [1, 0, 2, 3, 4],
                    [0, 2, 1, 3, 4],
                    [2, 0, 1, 3, 4],
                    [1, 2, 0, 3, 4],
                    [2, 1, 0, 3, 4],
                    [0, 1, 3, 2, 4]
                ])
            })
        })

        describe('inmutability', function () {
            it('map method does not mutate object', function () {
                const a = new Set([1, 6, 3])
                const x = Iterum(a)
                x.permutations()
                expect([...x]).to.be.deep.equal([...a])
            })
        })

        describe('converting iterum instance to array', function () {
            it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
                const a = [8, 7, 6]
                const iterable = Iterum(a)
                    .permutations()
                const iterator = iterable[Symbol.iterator]()
                expect(toNestedArray(iterator)).to.be.deep.equal(toNestedArray(iterable))
            })
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([1, 2, 3, 4]).permutations()
            const first = [...iterable]
            const second = [...iterable]
            expect(first.map(e => [...e]))
                .to.be.deep.equal(second.map(e => [...e]))
        })

        describe('iterables within iterable are not consumed on first iteration', function () {
            it('first iterable', function () {
                const iterator = Iterum([1, 2, 3, 4]).permutations()[Symbol.iterator]()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })

            it('second iterable', function () {
                const iterator = Iterum([1, 2, 3, 4]).permutations()[Symbol.iterator]()
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
            const iterable = Iterum.permutations('ab', e => e * 2)
            expect(toNestedArray(iterable)).to.be.deep.equal([
                ['a', 'b'],
                ['b', 'a']
            ])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.permutations(null)
            }
            expect(test).to.throw(TypeError,
                /^null is not an iterable$/)
        })
    })
})

function toNestedArray (nestedIterable) {
    return [...nestedIterable].map(e => [...e])
}
