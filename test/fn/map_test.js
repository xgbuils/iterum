var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var Value = Iterum.Value
var List = Iterum.List

describe('.map', function () {
    it('method returns and Iterum instance', function () {
        var values = Iterum(Range(1, 3, 1))
            .map(function (value) {
                return value * 2
            })
            .toArray()
        expect(values).to.be.deep.equal([2, 4, 6])
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            var iterumBuilder = Iterum(Range(8, 3, -1)).map(function (e) {
                return 2 * e
            })
            var iterator = iterumBuilder
                .build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('inmutability', function () {
        it('map method does not mutate object', function () {
            var x = Iterum(Range(8, 3, -1))
            x.map(function (e) {
                return e + 2
            })
            expect(x.toArray()).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('using index parameter of callback', function () {
        it('map method does not mutate object', function () {
            var values = Iterum(Range(8, 3, -1))
                .map(function (e, index) {
                    return e * index
                })
                .toArray()
            expect(values).to.be.deep.equal([0, 7, 12, 15, 16, 15])
        })
    })

    describe('using generator parameter of callback', function () {
        it('map method does not mutate object', function () {
            var values = Iterum(Range(1, 3))
                .map(function (e, index, generator) {
                    return generator.concat(Value(e)).toArray()
                })
                .toArray()
            expect(values).to.be.deep.equal([
                [1, 2, 3, 1],
                [1, 2, 3, 2],
                [1, 2, 3, 3]
            ])
        })
    })

    describe('using the whole parameters of callback', function () {
        it('map method does not mutate generator behaviour', function () {
            var values = Iterum(Range(1, 6))
                .map(function (e, index, generator) {
                    return generator.slice(index + e).toArray()
                })
                .toArray()
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
                var values = Iterum(List([1, 1, 2, 3, 5, 8]))
                    .map(function (e) {
                        return Iterum(List([e, 0]))
                    })
                    .toArray()
                expect(values).to.be.deep.equal([1, 0, 1, 0, 2, 0, 3, 0, 5, 0, 8, 0])
            })
        })
    })
})
