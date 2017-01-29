var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('.map', function () {
    it('method returns and Iterum instance', function () {
        var values = [...Range(1, 3, 1)
            .map(function (value) {
                return value * 2
            })]
        expect(values).to.be.deep.equal([2, 4, 6])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            var mapIterable = Range(8, 3, -1).map(function (e) {
                return 2 * e
            })
            var iterator = mapIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...mapIterable])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var values = [...Iterum([0, Range(5, 2, 1), 100]).map(function (e) {
                return e + 2
            })]
            expect(values).to.be.deep.equal([2, 102])
        })
    })

    describe('inmutability', function () {
        it('map method does not mutate object', function () {
            var x = Range(8, 3, -1)
            x.map(function (e) {
                return e + 2
            })
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('using index parameter of callback', function () {
        it('map method does not mutate object', function () {
            var values = [...Range(8, 3, -1)
                .map(function (e, index) {
                    return e * index
                })]
            expect(values).to.be.deep.equal([0, 7, 12, 15, 16, 15])
        })
    })

    describe('using some parameters of callback', function () {
        it('map method does not mutate iterum instance behaviour', function () {
            var values = [...Range(1, 3)
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
            var values = [...Range(1, 6)
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

    describe('when map returns iterum instance as value,', function () {
        describe('this value is converted in a sequence of values that represent the iterum instance', function () {
            it('given a iterum Range', function () {
                var values = [...Iterum([1, 1, 2, 3, 5, 8])
                    .map(function (e) {
                        return Iterum([e, 0])
                    })]
                expect(values).to.be.deep.equal([1, 0, 1, 0, 2, 0, 3, 0, 5, 0, 8, 0])
            })
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(5, 10, 1)
                .map({})
            }
            expect(foo).to.throw(TypeError,
                /^\[object Object\] is not a function$/)
        })
    })
})
