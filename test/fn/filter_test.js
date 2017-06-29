const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('filter', function () {
    describe('method', function () {
        it('omit odd numbers', function () {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const fn = e => e % 2 === 0
            const iterable = Iterum(a).filter(fn)
            expect([...iterable]).to.be.deep.equal([...a].filter(fn))
        })

        it('returns empty list, so any value of iterator is 3.14', function () {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const fn = e => e === 3.14
            const iterable = Iterum(a).filter(fn)
            expect([...iterable]).to.be.deep.equal([...a].filter(fn))
        })

        describe('converting iterum instance to array', function () {
            it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
                const a = [8, 7, 6, 5, 4, 3]
                const filteredIterable = Iterum(a)
                    .filter(e => e % 2 === 1)
                const iterator = filteredIterable[Symbol.iterator]()
                expect([...iterator]).to.be.deep.equal([...filteredIterable])
            })
        })

        describe('inmutability', function () {
            it('filter method does not mutate object', function () {
                const a = [8, 7, 6, 5, 4, 3]
                const iterable = Iterum(a)
                iterable.filter(e => e % 2 === 1)
                expect([...iterable]).to.be.deep.equal([...a])
            })
        })

        describe('bad arguments', function () {
            it('throws an exception when the first argument is not a function', function () {
                const a = [1, 4, 2, 7, 3]
                function foo () {
                    Iterum(a).filter(null)
                }
                expect(foo).to.throw(TypeError,
                    /^null is not a function$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const filterIterable = Iterum.filter(e => e % 2 === 1, [5, 7, 10])
            expect([...filterIterable]).to.be.deep.equal([5, 7])
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.filter(true, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^true is not a function$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.filter(e => e % 2 === 1, true)
            }
            expect(test).to.throw(TypeError,
                /^true is not an Iterable instance$/)
        })
    })
})
