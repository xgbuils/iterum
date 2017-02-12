const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {cartesian} = Iterum

describe('Iterum.cartesian', function () {
    describe('given 2 lists, it makes cartesian product of these lists', function () {
        it('2 no empty lists', function () {
            const values = [...cartesian([1, 2], [3, 4])]
            expect(values).to.be.deep.equal([
                [1, 3],
                [1, 4],
                [2, 3],
                [2, 4]
            ])
        })

        it('first list is empty', function () {
            const values = [...cartesian([], [1, 2, 3, 4])]
            expect(values).to.be.deep.equal([])
        })

        it('second list is empty', function () {
            const values = [...cartesian([1, 2, 3, 4], [])]
            expect(values).to.be.deep.equal([])
        })

        it('2 lista are empty', function () {
            const values = [...cartesian([], [])]
            expect(values).to.be.deep.equal([])
        })

        it('first list has one element', function () {
            const values = [...cartesian([0], [1, 2, 3, 4])]
            expect(values).to.be.deep.equal([
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4]
            ])
        })
    })

    describe('one list', function () {
        it('no empty list', function () {
            const values = [...cartesian([1, 2, 3, 4])]
            expect(values).to.be.deep.equal([
                [1], [2], [3], [4]
            ])
        })

        it('empty list', function () {
            const values = [...cartesian([])]
            expect(values).to.be.deep.equal([])
        })
    })

    describe('more than 2 lists', function () {
        it('3 no empty lists with the same length', function () {
            const values = [...cartesian([1, 2], [3, 4], [5, 6])]
            expect(values).to.be.deep.equal([
                [1, 3, 5],
                [1, 3, 6],
                [1, 4, 5],
                [1, 4, 6],
                [2, 3, 5],
                [2, 3, 6],
                [2, 4, 5],
                [2, 4, 6]
            ])
        })

        it('3 no empty lists with different length', function () {
            const values = [...cartesian([1, 2], [3], [4, 5, 6])]
            expect(values).to.be.deep.equal([
                [1, 3, 4],
                [1, 3, 5],
                [1, 3, 6],
                [2, 3, 4],
                [2, 3, 5],
                [2, 3, 6]
            ])
        })

        it('there is an empty list', function () {
            const values = [...cartesian([1, 2, 3], new Set([3, 4, 5, 3, 2, 4]), [], [4, 5, 6])]
            expect(values).to.be.deep.equal([])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when it is not passed any argument', function () {
            function foo () {
                cartesian()
            }
            expect(foo).to.throw(TypeError,
                /^undefined is not an Iterable instance$/)
        })

        it('throws an exception when it is passed no iterable in 1st argument', function () {
            function foo () {
                cartesian(23)
            }
            expect(foo).to.throw(TypeError,
                /^23 is not an Iterable instance$/)
        })

        it('second to Infinity arguments are optional but they must be iterables', function () {
            function foo () {
                cartesian([23], [], [1, 3], null, [1])
            }
            expect(foo).to.throw(TypeError,
                /^null is not an Iterable instance$/)
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const cartesianIterable = cartesian([1, 3], [6, 10])
            const iterator = cartesianIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...cartesianIterable])
        })
    })

    describe('If cartesian instance is passed as param of Iterum', function () {
        it('creates a clone of cartesian instance', function () {
            const PARAMS = [1, 5]
            const a = cartesian(PARAMS)
            const b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect([...a]).to.be.deep.equal([...b])
        })
    })
})
