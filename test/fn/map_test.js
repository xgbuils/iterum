const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('.map', function () {
    it('method returns and Iterum instance', function () {
        const values = [...range(1, 3, 1)
            .map(function (value) {
                return value * 2
            })]
        expect(values).to.be.deep.equal([2, 4, 6])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const mapIterable = range(8, 3, -1).map(function (e) {
                return 2 * e
            })
            const iterator = mapIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...mapIterable])
        })
    })

    describe('inmutability', function () {
        it('map method does not mutate object', function () {
            const x = range(8, 3, -1)
            x.map(function (e) {
                return e + 2
            })
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('using index parameter of callback', function () {
        it('map method does not mutate object', function () {
            const values = [...range(8, 3, -1)
                .map(function (e, index) {
                    return e * index
                })]
            expect(values).to.be.deep.equal([0, 7, 12, 15, 16, 15])
        })
    })

    describe('using some parameters of callback', function () {
        it('map method does not mutate iterum instance behaviour', function () {
            const values = [...range(1, 3)
                .map(function (e, index, iterum) {
                    return [...iterum.concat(Iterum([e]))]
                })]
            expect(values).to.be.deep.equal([
                [1, 2, 3, 1],
                [1, 2, 3, 2],
                [1, 2, 3, 3]
            ])
        })
    })

    describe('using all parameters of callback', function () {
        it('map method does not mutate iterum instance behaviour', function () {
            const values = [...range(1, 6)
                .map(function (e, index, iterum) {
                    return [...iterum.slice(index + e)]
                })]
            expect(values).to.be.deep.equal([
                [2, 3, 4, 5, 6],
                [4, 5, 6],
                [6],
                [],
                [],
                []
            ])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                range(5, 10, 1)
                .map({})
            }
            expect(foo).to.throw(TypeError,
                /^\[object Object\] is not a function$/)
        })
    })
})
