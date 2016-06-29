var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var Empty = Iterum.Empty
var List = Iterum.List
var Value = Iterum.Value

describe('concat', function () {
    describe('concatenation using constructors', function () {
        it('given two no empty generators returns Iterum instance concatenation', function () {
            var values = Range(0, 3, 1)
                .concat(Range(4, 16, 4))
                .toArray()
            expect(values).to.be.deep.equal([0, 1, 2, 3, 4, 8, 12, 16])
        })

        it('concatenating empty generator with no empty generator works well', function () {
            var values = Empty()
                .concat(Range(4, 16, 4))
                .toArray()
            expect(values).to.be.deep.equal([4, 8, 12, 16])
        })

        it('concatenating no empty generator with empty generator works well', function () {
            var values = Range(0, 3, 1)
                .concat(Empty())
                .toArray()
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })

        it('concatenating empty generator with empty generator works well', function () {
            var values = Empty()
                .concat(Empty())
                .toArray()
            expect(values).to.be.deep.equal([])
        })

        it('concatenating generator with Iterum instance works well', function () {
            var values = List([3, 5])
                .concat(List([4, 2]))
                .toArray()
            expect(values).to.be.deep.equal([3, 5, 4, 2])
        })
    })

    describe('concatenation using customized function', function () {
        function generator () {
            var done = false
            return {
                next: function () {
                    var result = {
                        value: done ? undefined : 8,
                        done: done
                    }
                    done = true
                    return result
                }
            }
        }
        it('concatenating generator with Iterum instance works well', function () {
            var values = List([3, 5])
                .concat(generator)
                .toArray()
            expect(values).to.be.deep.equal([3, 5, 8])
        })
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect behaviour of iterator obtained by .build()()', function () {
            var iterumBuilder = Range(8, 3, -1)
                .concat(Range(4, 16, 4))
            var generator = iterumBuilder
                .build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(generator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('inmutability', function () {
        it('concat method does not mutate object', function () {
            var x = Range(8, 3, -1)
            x.concat(Range(4, 16, 4))
            expect(x.toArray()).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        describe('this value is interpreted as a sequence of values of this iterum instance', function () {
            it('passing iterum instance in concat method', function () {
                var values = Value(8)
                    .concat(List([100, Range(1, 5)])).toArray()
                expect(values).to.be.deep.equal([8, 100, 1, 2, 3, 4, 5])
            })

            it('passing generator in concat method', function () {
                var values = Value(4).concat(function () {
                    var done = false
                    return {
                        next: function () {
                            var state = {
                                value: done ? undefined : List([1, 2, Empty(), 3]),
                                done: done
                            }
                            done = true
                            return state
                        }
                    }
                })
                .toArray()
                expect(values).to.be.deep.equal([4, 1, 2, 3])
            })
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function or Iterum', function () {
            function foo () {
                Range(5, 10, 1)
                .concat()
            }
            expect(foo).to.throw(TypeError,
                /^concat: in 1st argument, undefined is not an instance of Iterum, or a Function$/)
        })
    })
})
