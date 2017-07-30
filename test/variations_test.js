const {expect} = require('chai')
const Iterum = require('../src/')
const {toNestedArray} = require('./utils/')
const {range} = Iterum

describe('.variations', function () {
    describe('method', function () {
        context('given empty iterable', function () {
            it('variations of 3 ', function () {
                const arr = []
                const iterable = Iterum(arr).variations(3)
                expect(toNestedArray(iterable)).to.be.deep.equal([])
            })
            it('variations of 0', function () {
                const arr = []
                const iterable = Iterum(arr).variations(0)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    []
                ])
            })
            it('variations of negative number over empty iterable', function () {
                const arr = []
                const iterable = Iterum(arr).variations(-5)
                expect(toNestedArray(iterable)).to.be.deep.equal([])
            })
        })
        context('given non empty iterable', function () {
            it('variations of 1 over iterable of 1 element', function () {
                const arr = [9]
                const iterable = Iterum(arr).variations(1)
                expect(toNestedArray(iterable)).to.be.deep.equal([arr])
            })

            it('variations of 1 over iterable of 4 elements', function () {
                const arr = [1, 2, 3, 4]
                const iterable = Iterum(arr).variations(1)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [1],
                    [2],
                    [3],
                    [4]
                ])
            })

            it('variations of 2 over iterable of 4 elements', function () {
                const arr = [1, 2, 3, 4]
                const iterable = Iterum(arr).variations(2)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [1, 2],
                    [2, 1],
                    [1, 3],
                    [3, 1],
                    [2, 3],
                    [3, 2],
                    [1, 4],
                    [4, 1],
                    [2, 4],
                    [4, 2],
                    [3, 4],
                    [4, 3]
                ])
            })

            it('variations of 3 over iterable of 3 elements', function () {
                const arr = [1, 2, 3]
                const iterable = Iterum(arr).variations(3)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [1, 2, 3],
                    [2, 1, 3],
                    [1, 3, 2],
                    [3, 1, 2],
                    [2, 3, 1],
                    [3, 2, 1]
                ])
            })

            describe('0 possible variations', function () {
                it('variations of 8 over iterable of 2 elements', function () {
                    const arr = [5, 4]
                    const iterable = Iterum(arr).variations(8)
                    expect(toNestedArray(iterable)).to.be.deep.equal([])
                })

                it('variations of 5 over iterable of 4', function () {
                    const arr = [1, 3, 5, 7]
                    const iterable = Iterum(arr).variations(5)
                    expect(toNestedArray(iterable)).to.be.deep.equal([])
                })
            })

            it('variations of 0 over iterable of 3 elements', function () {
                const arr = [2, 4, 6]
                const iterable = Iterum(arr).variations(0)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    []
                ])
            })
        })
        describe('infinite iterables', function () {
            it('works well without producing infinite loops', function () {
                const naturals = range(0, Infinity)
                const iterable = naturals.variations(3)
                    .map(variation => variation.take(5))
                    .take(9)
                expect(toNestedArray(iterable)).to.be.deep.equal([
                    [0, 1, 2],
                    [1, 0, 2],
                    [0, 2, 1],
                    [2, 0, 1],
                    [1, 2, 0],
                    [2, 1, 0],
                    [0, 1, 3],
                    [1, 0, 3],
                    [0, 3, 1]
                ])
            })
        })

        describe('wrong arguments', function () {
            it('throws an exception when the first argument is not a number', function () {
                const a = new Map([['a', 'A'], ['b', 'B']])
                function test () {
                    Iterum(a).variations({})
                }
                expect(test).to.throw(TypeError,
                    /^\[object Object\] is not a number$/)
            })
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([1, 2, 3, 4]).variations(3)
            const first = toNestedArray(iterable)
            const second = toNestedArray(iterable)
            expect(first).to.be.deep.equal(second)
        })

        describe('iterables within iterable are not consumed on first iteration', function () {
            it('first iterable', function () {
                const iterator = Iterum([1, 2, 3, 4]).variations(3)[Symbol.iterator]()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })

            it('second iterable', function () {
                const iterator = Iterum([1, 2, 3, 4]).variations(3)[Symbol.iterator]()
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
            const iterable = Iterum.variations(2, [5, 7, 10])
            expect(toNestedArray(iterable)).to.be.deep.equal([
                [5, 7],
                [7, 5],
                [5, 10],
                [10, 5],
                [7, 10],
                [10, 7]
            ])
        })

        it('throws an error if first parameter is not a number', function () {
            function test () {
                Iterum.variations(false, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^false is not a number$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.variations(2, false)
            }
            expect(test).to.throw(TypeError,
                /^false is not an iterable$/)
        })
    })
})
