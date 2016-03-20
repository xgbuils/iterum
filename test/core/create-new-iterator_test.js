var expect = require('chai').expect
var createNewIterator = require('../../src/core/create-new-iterator')
var sinon = require('sinon')
var RangeGenerator = require('../../src/range-generator')
var ValueGenerator = require('../../src/value-generator')
var state = {}
state.nextParamsCallback = function () {
    state.nextParams = toArray(arguments)
}

describe('createNewIterator', function () {
    describe('constructor does not call next-parameters `_` callback', function () {
        it('returns undefined', function () {
            var item = itemMock(function () {
                return RangeGenerator(0, 3)
            })
            var previous = previousMock(123)
            expect(createNewIterator({}, item, previous, state)).to.be.deep.equal(undefined)
        })
    })

    describe('constructor calls next-parameters callback', function () {
        it('returns undefined', function () {
            var _ = state.nextParamsCallback
            var item = itemMock(function (_) {
                _(1, _, 8)
                return RangeGenerator(2, 1, -1)
            })
            var previous = previousMock('buzz')
            expect(createNewIterator({}, item, previous, state))
                .to.be.deep.equal([1, _, 8])
        })
    })

    describe('params of item.ctor', function () {
        describe('last parameter of item.ctor', function () {
            it('is always a next-parameters _ function', function () {
                var item = itemMock(function (a, b, _) {
                    _(5, 'foo')
                    return ValueGenerator('example')
                }, 2, 3)
                sinon.spy(item, 'ctor')
                var previous = previousMock('didedu')
                createNewIterator({}, item, previous, state)
                var length = item.ctor.args[0].length
                expect({
                    lastArg: item.ctor.args[0][length - 1],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    lastArg: state.nextParamsCallback,
                    calledOnce: true
                })
            })
        })
        describe('if some parameter of item.args is state.nextParamsCallback', function () {
            it('is replaced by previous.state.value', function () {
                var param = {fizz: 'buzz'}
                var _ = state.nextParamsCallback
                var item = itemMock(function () {
                    return 'anything'
                }, param, _)
                var previous = previousMock('')
                sinon.spy(item, 'ctor')

                createNewIterator({}, item, previous, state)
                expect({
                    args: item.ctor.args[0],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    args: [param, '', _],
                    calledOnce: true
                })
            })
        })
        describe('if some parameter of item.args is state.nextParamsCallback', function () {
            it('is replaced by undefined if previous is not defined', function () {
                var param = {fizz: 'buzz'}
                var _ = state.nextParamsCallback
                var item = itemMock(function () {
                    return 'anything'
                }, param, _, 8)
                var previous
                sinon.spy(item, 'ctor')

                createNewIterator({}, item, previous, state)
                expect({
                    args: item.ctor.args[0],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    args: [param, undefined, 8, _],
                    calledOnce: true
                })
            })
        })
        describe('if item.args does not have any parameter equal to state.nextParamsCallback', function () {
            it('item.ctor is called with the same parameters', function () {
                var param = {fizz: 'buzz'}
                var _ = state.nextParamsCallback
                var item = itemMock(function () {
                    return 'anything'
                }, param)
                var previous = previousMock('')
                sinon.spy(item, 'ctor')

                createNewIterator({}, item, previous, state)
                expect({
                    args: item.ctor.args[0],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    args: [param, _],
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
