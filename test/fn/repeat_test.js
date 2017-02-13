const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('repeat', function () {
    it('default parameter is Infinity', function () {
        const iterator = Iterum([8]).repeat()[Symbol.iterator]()
        for (let i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: 8,
                done: false
            })
        }
    })

    it('if parameter is 0, it always returns {value: undefined, done: true}', function () {
        const iterator = Iterum([8]).repeat(0)[Symbol.iterator]()
        for (let i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        }
    })

    it('if second parameter is 3, it returns the first parameter three times', function () {
        expect([...Iterum([8]).repeat(3)]).to.be.deep.equal([8, 8, 8])
    })

    it('ends with {value: undefined, done: true}', function () {
        const iterator = Iterum([8]).repeat(3)[Symbol.iterator]()
        let end
        do {
            end = iterator.next()
        } while (!end.done)
        expect(end).to.be.deep.equal({
            value: undefined,
            done: true
        })
    })

    describe('With more complex iterum instance', function () {
        it('works properly', function () {
            const values = [...Iterum([1, 3, 2]).repeat(3)]
            expect(values).to.be.deep.equal([1, 3, 2, 1, 3, 2, 1, 3, 2])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterum = Iterum([8]).repeat(3)
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the second parameter is not a Number or undefined', function () {
            function foo () {
                Iterum('foo').repeat('bar')
            }
            expect(foo).to.throw(TypeError,
                /bar is not a number or undefined/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const repeatIterable = Iterum.repeat([5, 7, 10], 2)
            expect([...repeatIterable]).to.be.deep.equal([5, 7, 10, 5, 7, 10])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const repeatIterable = Iterum.repeat(-15, 2)
            expect([...repeatIterable]).to.be.deep.equal([])
        })
    })
})
