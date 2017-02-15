'use strict';

const assert = require('chai').assert;
const safe = require('./');

describe('func/safe', () => {

  const fn = (arg) => arg;

  it('Exports safe function', () => assert.typeOf(safe, 'function'));

  it('Runs a function correctly', (done) => {
    let a_variable = 'Goodbye';

    function a_function() {
      a_variable = 'Hello';
    }

    safe(a_function);

    assert.equal(a_variable, 'Hello');
    done();
  });

  it('Returns a correct value from a function', (done) => {
    function a_function(arg) {
      return arg;
    }
    const res = safe(a_function, null, 'Hello');

    assert.equal(res, 'Hello');
    done();
  });

  it('Runs function with correct context', (done) => {
    function a_function() {
      return this.arg;
    }
    const res = safe(a_function, {
      arg: 'Hello'
    });

    assert.equal(res, 'Hello');
    done();
  });

  it('Safely fails to run something that is not a function', (done) => {
    let not_a_function = null;

    assert.equal(safe(not_a_function), undefined);
    done();
  });

});
