const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('Iterum.range', function () {
    describe('increasing range (-2, 8, 2)', function () {
        let rangeIterable
        beforeEach(function () {
            rangeIterable = range(-2, 8, 2)
        })
        it('starts with {value: -2, done: false}', function () {
            const iterator = rangeIterable[Symbol.iterator]()
            expect(iterator.next()).to.be.deep.equal({
                value: -2,
                done: false
            })
        })
        it('generates values [-2, 0, 2, 4, 6, 8]', function () {
            expect([...rangeIterable]).to.be.deep.equal([-2, 0, 2, 4, 6, 8])
        })
        it('ends with {value: undefined, done: true}', function () {
            const iterator = rangeIterable[Symbol.iterator]()
            let end
            do {
                end = iterator.next()
            } while (!end.done)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            const iterator = rangeIterable[Symbol.iterator]()
            let state
            do {
                state = iterator.next()
            } while (!state.done)
            iterator.next()
            iterator.next()
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('decreasing Iterum.range(3, 1, -1)', function () {
        let rangeIterable
        beforeEach(function () {
            rangeIterable = range(3, 1, -1)
        })
        it('starts with {value: 3, done: false}', function () {
            const iterator = rangeIterable[Symbol.iterator]()
            expect(iterator.next()).to.be.deep.equal({
                value: 3,
                done: false
            })
        })
        it('generates values [3, 2, 1]', function () {
            expect([...rangeIterable]).to.be.deep.equal([3, 2, 1])
        })
        it('ends with {value: undefined, done: true}', function () {
            const iterator = rangeIterable[Symbol.iterator]()
            let end
            do {
                end = iterator.next()
            } while (!end.done)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            const iterator = rangeIterable[Symbol.iterator]()
            let state
            do {
                state = iterator.next()
            } while (!state.done)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('Iterum.range iterable with one element', function () {
        it('starts with {value: 2, done: false}', function () {
            const iterator = range(2, 2, 1)[Symbol.iterator]()
            expect(iterator.next()).to.be.deep.equal({
                value: 2,
                done: false
            })
        })
        it('only generates one value (2)', function () {
            expect([...range(2, 2, 1)]).to.be.deep.equal([2])
        })
        it('only generates one value (5)', function () {
            expect([...range(5, 5, -3)]).to.be.deep.equal([5])
        })
        it('ends with {value: undefined, done: true}', function () {
            const iterator = range(5, 5, -3)[Symbol.iterator]()
            let end
            do {
                end = iterator.next()
            } while (!end.done)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('Iterum.range iterable with zero elements', function () {
        context('increasing generator that start value is greater than end value', function () {
            it('generates zero elements', function () {
                expect([...range(4, 2, 1)]).to.be.deep.equal([])
            })
        })
        context('decreasing generator that start value is less than end value', function () {
            it('generates zero elements', function () {
                expect([...range(1, 5, -2)]).to.be.deep.equal([])
            })
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const rangeIterable = range(8, 3, -1)
            const iterator = rangeIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...rangeIterable])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when is passed one parameter', function () {
            function foo () {
                range(3)
            }
            expect(foo).to.throw(TypeError,
                /undefined is not a number/)
        })

        it('throws an exception when is not passed any parameter', function () {
            function foo () {
                range()
            }
            expect(foo).to.throw(TypeError,
                /undefined is not a number/)
        })
    })

    describe('If Iterum.range instance is passed as param of Iterum', function () {
        it('creates a clone of passed instance', function () {
            const a = range(6, 3, -2)
            const b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect([...a]).to.be.deep.equal([...b])
        })
    })
})
