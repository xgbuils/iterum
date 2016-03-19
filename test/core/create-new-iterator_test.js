var expect = require('chai').expect
var createNewIterator = require('../../src/core/create-new-iterator')
var sinon = require('sinon')
var RangeGenerator = require('../../src/range-generator')
var ValueGenerator = require('../../src/value-generator')


describe('createNewIterator', function () {
    describe('constructor does not call next-parameters callback', function () {
        it('returns undefined', function () {
            var item = itemMock(function () {
                return RangeGenerator(0, 3)
            })
            var previous = previousMock(123)
            expect(createNewIterator({}, item, previous, toArray)).to.be.deep.equal(undefined)
        })
    })

    describe('constructor calls next-parameters callback', function () {
        it('returns undefined', function () {
            var item = itemMock(function (nextParams) {
                nextParams(1, 5, 8)
                return RangeGenerator(2, 1, -1)
            })
            var previous
            expect(createNewIterator({}, item, previous, toArray)).to.be.deep.equal([1, 5, 8])
        })
    })

    describe('when it exists previous item', function () {
        it('item.ctor is called with value of previous item as first parameter', function () {
            var item = itemMock(function (a, nextParams) {
                nextParams(5, 'foo')
                return ValueGenerator('example')
            })
            sinon.spy(item, 'ctor')
            var previous = previousMock('didedu')
            createNewIterator({}, item, previous, toArray)
            expect({
                calledWithProperlyArgs: item.ctor.calledWith('didedu'),
                calledOnce: item.ctor.calledOnce
            }).to.be.deep.equal({
                calledWithProperlyArgs: true,
                calledOnce: true
            })
        })
    })

    describe('when it does not exist previous item', function () {
        it('item.ctor is not called with value of previous item as first parameter', function () {
            var item = itemMock(function (a, b) {
                return ValueGenerator('zombie')
            })
            sinon.spy(item, 'ctor')
            var previous
            createNewIterator({}, item, previous, toArray)
            expect({
                argsLength: item.ctor.args.length,
                typeArg: typeof item.ctor.args[0][0],
                calledOnce: item.ctor.calledOnce
            }).to.be.deep.equal({
                argsLength: 1,
                typeArg: 'function',
                calledOnce: true
            })
        })
    })

    describe('params of item.ctor', function () {
        describe('last parameter of item.ctor', function () {
            it('is always a next-parameters function', function () {
                var item = itemMock(function (a, b, c, nextParams) {
                    nextParams(5, 'foo')
                    return ValueGenerator('example')
                }, 2, 3)
                sinon.spy(item, 'ctor')
                var previous = previousMock('didedu')
                createNewIterator({}, item, previous, toArray)
                var length = item.ctor.args[0].length
                expect({
                    typeOfLastArg: typeof item.ctor.args[0][length - 1],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    typeOfLastArg: 'function',
                    calledOnce: true
                })
            })
        })
        describe('exist previous item & 1 param cached', function () {
            it('returns 3 = 1 + 1 + 1 parameters', function () {
                var param = {fizz: 'buzz'}
                var item = itemMock(function () {
                    return 'anything'
                }, param)
                sinon.spy(item, 'ctor')
                var previous = previousMock('')
                createNewIterator({}, item, previous, toArray)
                var length = item.ctor.args[0].length
                expect({
                    length: length,
                    args: item.ctor.args[0].slice(0, length - 1),
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    length: 3,
                    args: ['', param],
                    calledOnce: true
                })
            })
        })
    })
})

function previousMock (value) {
    return {
        state: {
            value: value
        }
    }
}

function itemMock (ctor) {
    var mock = {
        ctor: ctor
    }
    if (arguments.length > 1) {
        mock.args = [].slice.call(arguments, 1)
    }
    return mock
}

function toArray (arraylike) {
    return [].slice.call(arraylike)
}
