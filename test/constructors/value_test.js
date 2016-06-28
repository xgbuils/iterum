var expect = require('chai').expect
var traverse = require('../utils/traverse.js')
var Iterum = require('../../src/index.js')
var Value = Iterum.Value
var List = Iterum.List
var Repeat = Iterum.Repeat

describe('Iterum.Value', function () {
    describe('given any value passed to constructor, then this value is given at first time and property `done` is false', function () {
        it('if value is 7 it is given 7', function () {
            var iterator = Value(7).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: 7,
                done: false
            })
        })
        it('if value is an object it is given the same object', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = Value(obj).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: obj,
                done: false
            })
        })
        it('if value is an string it is given the same string', function () {
            var iterator = Value('velociraptor').build()()
            expect(iterator.next()).to.be.deep.equal({
                value: 'velociraptor',
                done: false
            })
        })
    })

    describe('After call `next` for first time, then `next` ...', function () {
        it('always returns {value: undefined, done: true}', function () {
            var iterator = Value(7).build()()
            iterator.next()
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = Value(obj).build()()
            traverse(iterator, 5)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            var iterator = Value('velociraptor').build()()
            traverse(iterator, 2)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('If value is a iterum instance,', function () {
        describe('this value is interpreted as a sequence of values of this iterum instance', function () {
            it('using Repeat as iterum instance value inside Value parameter', function () {
                var values = Value(Repeat(1, 4)).toArray()
                expect(values).to.be.deep.equal([1, 1, 1, 1])
            })

            it('using Value instance as parameter of List instance', function () {
                var values = List([Repeat(42, 3), 1]).toArray()
                expect(values).to.be.deep.equal([42, 42, 42, 1])
            })
        })
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect behaviour of iterator obtained by .build()()', function () {
            var iterumBuilder = Value(5)
            var iterator = iterumBuilder.build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('If Value instance is passed as param of Iterum', function () {
        it('creates a clone of Value instance', function () {
            var a = Value(5)
            var b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect(a.toArray()).to.be.deep.equal(b.toArray())
        })
    })
})
