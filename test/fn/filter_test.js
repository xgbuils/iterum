const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('filter', function () {
    it('omit odd numbers', function () {
        const values = [...range(0, 10)
            .filter(function (e) {
                return e % 2 === 0
            })]
        expect(values).to.be.deep.equal([0, 2, 4, 6, 8, 10])
    })

    it('returns empty list, so any value of iterator is 3.14', function () {
        const values = [...range(0, 10, 1)
            .filter(function (value) {
                return value === 3.14
            })]
        expect(values).to.be.deep.equal([])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const filteredIterable = range(8, 3, -1).filter(function (e) {
                return e % 2 === 1
            })
            const iterator = filteredIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...filteredIterable])
        })
    })

    describe('inmutability', function () {
        it('filter method does not mutate object', function () {
            const x = range(8, 3, -1)
            x.filter(function (e) {
                return e % 2 === 1
            })
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('using the whole parameters of callback', function () {
        it('filter method does not mutate iterum instance behaviour', function () {
            const values = [...range(1, 10)
                .filter(function (e, index, iterum) {
                    return e <= 8 &&
                        index % 2 === 0 &&
                        [...iterum.slice(index)].length <= 8
                })]
            expect(values).to.be.deep.equal([3, 5, 7])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            const values = [...Iterum([range(1, 5)])
                .filter(function (e) {
                    return e <= 3
                })]
            expect(values).to.be.deep.equal([1, 2, 3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                range(5, 10, 1).filter(null)
            }
            expect(foo).to.throw(TypeError,
                /^null is not a function$/)
        })
    })
})
