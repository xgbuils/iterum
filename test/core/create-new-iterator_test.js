var expect = require('chai').expect
var createNewIterator = require('../../src/core/create-new-iterator')
var sinon = require('sinon')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var state = {}
state.nextParamsCallback = function (...nextParams) {
    state.nextParams = nextParams
}

describe('createNewIterator', function () {
    describe('constructor does not call next-parameters `_` callback', function () {
        it('returns undefined', function () {
            var item = itemMock(function* () {
                yield* Range(0, 3)
            })
            var previous = previousMock(123)
            createNewIterator({}, item, previous, state)
            item.itor.next()
            expect(state.nextParams).to.be.deep.equal(undefined)
        })
    })

    describe('constructor calls next-parameters callback', function () {
        it('returns undefined', function () {
            var _ = state.nextParamsCallback
            var item = itemMock(function* (_) {
                _(1, _, 8)
                yield* Range(2, 1, -1)
            })
            var previous = previousMock('buzz')
            createNewIterator({}, item, previous, state)
            item.itor.next()
            expect(state.nextParams).to.be.deep.equal([1, _, 8])
        })
    })

    describe('params of item.ctor', function () {
        describe('last parameter of item.ctor', function () {
            it('is always a next-parameters _ function', function () {
                var item = itemMock(function* (a, b, _) {
                    _(5, 'foo')
                    yield* Iterum(['example'])
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

function itemMock (ctor, ...args) {
    var mock = {
        ctor: ctor
    }
    if (args.length > 0) {
        mock.args = args
    }
    return mock
}
