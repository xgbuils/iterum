var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Repeat = Iterum.Repeat

describe('Iterum.Repeat', function () {
    it('without second parameter, it always returns the same value', function () {
        var iterator = Repeat(8).build()()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: 8,
                done: false
            })
        }
    })

    it('if second parameter is 0, it always returns {value: undefined, done: true}', function () {
        var iterator = Repeat(8, 0).build()()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        }
    })

    it('if second parameter is 3, it returns the first parameter three times', function () {
        expect(Repeat(8, 3).toArray()).to.be.deep.equal([8, 8, 8])
    })

    it('ends with {value: undefined, done: true}', function () {
        var iterator = Repeat(8, 3).build()()
        var end = traverse(iterator)
        expect(end).to.be.deep.equal({
            value: undefined,
            done: true
        })
    })

    describe('If value is a iterum instance,', function () {
        describe('this value is interpreted as a sequence of values of this iterum instance', function () {
            it('using iterum instance value inside Repeat parameter', function () {
                var values = Repeat(Iterum([1, 3, 2]), 2).toArray()
                expect(values).to.be.deep.equal([1, 3, 2, 1, 3, 2])
            })

            it('using Repeat instance as value of iterable', function () {
                var values = Iterum([Repeat(1, 3), Repeat(2, 3)]).toArray()
                expect(values).to.be.deep.equal([1, 1, 1, 2, 2, 2])
            })
        })
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect behaviour of iterator obtained by .build()()', function () {
            var iterumBuilder = Repeat(8, 3)
            var iterator = iterumBuilder.build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the second parameter is not a Number or undefined', function () {
            function foo () {
                Repeat('foo', 'bar')
            }
            expect(foo).to.throw(TypeError,
                /Repeat: in 2nd argument, bar is not a Number or Undefined/)
        })
    })

    describe('If Repeat instance is passed as param of Iterum', function () {
        it('creates a clone of Repeat instance', function () {
            var a = Repeat(5, 3)
            var b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect(a.toArray()).to.be.deep.equal(b.toArray())
        })
    })
})
