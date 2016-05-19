var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Repeat = Iterum.Repeat
var Empty = Iterum.Empty
var Range = Iterum.Range

describe('Iterum.Repeat', function () {
    it('without second parameter, it always returns the same value', function () {
        var iterator = Iterum(Repeat(8)).build()()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: 8,
                done: false
            })
        }
    })

    it('if second parameter is 0, it always returns {value: undefined, done: true}', function () {
        var iterator = Iterum(Repeat(8, 0)).build()()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        }
    })

    it('if second parameter is 3, it returns the first parameter three times', function () {
        expect(Iterum(Repeat(8, 3)).toArray()).to.be.deep.equal([8, 8, 8])
    })

    it('ends with {value: undefined, done: true}', function () {
        var iterator = Iterum(Repeat(8, 3)).build()()
        var end = traverse(iterator)
        expect(end).to.be.deep.equal({
            value: undefined,
            done: true
        })
    })

    describe('passing iterum instance as value,', function () {
        describe('this value is converted in a sequence of values that represent the iterum instance', function () {
            it('given a iterum Range', function () {
                var values = Iterum(Repeat(Iterum(Range(1, 3)), 2))
                    .toArray()
                expect(values).to.be.deep.equal([1, 2, 3, 1, 2, 3])
            })

            it('given a iterum Value', function () {
                var values = Iterum(Repeat(Iterum(Empty()), 5))
                    .toArray()
                expect(values).to.be.deep.equal([])
            })
        })
    })

    it('calling toArray() in iterum instance don\'t affect using iterator obtained by .build()()', function () {
        var iterumBuilder = Iterum(Repeat(8, 3))
        var iterator = iterumBuilder.build()()
        var array = iterumBuilder.toArray()
        var values = []
        traverse(iterator, function (node) {
            values.push(node.value)
        })
        expect(values).to.be.deep.equal(array)
    })

    describe('bad arguments', function () {
        it('throws an exception when the second parameter is not a Number or undefined', function () {
            var gen = Iterum(Repeat('foo', 'bar')).build()
            expect(gen).to.throw(TypeError,
                /Repeat: in 2nd argument is expected a Number or Undefined but value `bar` is a String/)
        })
    })
})
