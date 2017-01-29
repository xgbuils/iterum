var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')

describe('repeat', function () {
    it('default parameter is Infinity', function () {
        var iterator = Iterum([8]).repeat()[Symbol.iterator]()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: 8,
                done: false
            })
        }
    })

    it('if parameter is 0, it always returns {value: undefined, done: true}', function () {
        var iterator = Iterum([8]).repeat(0)[Symbol.iterator]()
        for (var i = 0; i < 5; ++i) {
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
        var iterator = Iterum([8]).repeat(3)[Symbol.iterator]()
        var end = traverse(iterator)
        expect(end).to.be.deep.equal({
            value: undefined,
            done: true
        })
    })

    describe('With more complex iterum instance', function () {
        it('works properly', function () {
            var values = [...Iterum([1, 3, 2]).repeat(3)]
            expect(values).to.be.deep.equal([1, 3, 2, 1, 3, 2, 1, 3, 2])
        })
    })

    describe('if iterable has a value produce with .repeat() method', function () {
        it('this value is expanded', function () {
            var values = [...Iterum([Iterum([1]), Iterum([2])].map(e => e.repeat(3)))]
            expect(values).to.be.deep.equal([1, 1, 1, 2, 2, 2])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            var iterum = Iterum([8]).repeat(3)
            var iterator = iterum[Symbol.iterator]()
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
})
