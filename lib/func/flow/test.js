'use strict';

const assert = require('chai').assert;
const flow = require('./');

describe('func/flow', () => {

  it('Exports flow function', () => assert.typeOf(flow, 'function'));

  it('Returns the return value of the last function in synchronous flow', (done) => {
    const res = flow()
      .step(next => next())
      .step(next => next(1))
      .step((i, next) => next(++i)) // 2
      .step((i, next) => next('1'+i)) // '12'
      .step((i, next) => parseInt(i)-1) // 11
      .go();

    assert.equal(res, 11);
    done();
  });

  it('Runs a synchronous flow to the end', (done) => {
    let res = 1;

    assert.doesNotThrow(() => {
      const thing = flow()
        .step(next => next())
        .step(next => {
          assert.equal(res, 1);
          next(done);
        })
        .step(next => next())
        .go();

      res = 10;
    });
  });

  it('Runs an asynchronous flow to the end', (done) => {
    let res = 1;

    assert.doesNotThrow(() => {
      const thing = flow()
        .step(next => setTimeout(next, 0))
        .step(next => {
          assert.equal(res, 10);
          next(done);
        })
        .step(next => next())
        .go();

      res = 10;
    });
  });

  it('Passes initial arguments from \'go\'', (done) => {
    let args = [1, 2, 3];

    assert.doesNotThrow(() => {
      const thing = flow()
        .step((a, b, c, next) => setTimeout(() => next(a + b + c), 0))
        .step((sum, next) => {
          assert.equal(sum, args.reduce((a, b) => a + b));
          next(done);
        })
        .step(next => next())
        .go(...args);
    });
  });

});
