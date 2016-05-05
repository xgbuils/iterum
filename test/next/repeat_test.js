var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Repeat = Iterum.Repeat

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
})
