var expect = require('chai').expect
var traverse = require('../utils/traverse.js')
var Iterum = require('../../src/index.js')
var Value = Iterum.Value

describe('Iterum.Value', function () {
    describe('given any value passed to constructor, then this value is given at first time and property `done` is false', function () {
        it('if value is 7 it is given 7', function () {
            var iterator = new Iterum(Value(7))
            expect(iterator.next()).to.be.deep.equal({
                value: 7,
                done: false
            })
        })
        it('if value is an object it is given the same object', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = new Iterum(Value(obj))
            expect(iterator.next()).to.be.deep.equal({
                value: obj,
                done: false
            })
        })
        it('if value is an string it is given the same string', function () {
            var iterator = new Iterum(Value('velociraptor'))
            expect(iterator.next()).to.be.deep.equal({
                value: 'velociraptor',
                done: false
            })
        })
    })

    describe('After call `next` for first time, then `next` ...', function () {
        it('always returns {value: undefined, done: true}', function () {
            var iterator = new Iterum(Value(7))
            iterator.next()
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = new Iterum(Value(obj))
            traverse(iterator, 5)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            var iterator = new Iterum(Value('velociraptor'))
            traverse(iterator, 2)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })
})
