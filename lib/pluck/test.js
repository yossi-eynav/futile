'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const pluck = require('./');

describe('pluck', () => {

  const _array = [
    { my_key: 'a' },
    { my_key: 'b' },
    { my_key: 'c' },
    { my_key: 'd' }
  ];

  it('Exports pluck function', () => assert.typeOf(pluck, 'function'));

  it('pluck can process array', (done) => {
    expect(pluck.bind(null, [])).to.not.throw(TypeError);
    done();
  });

  it('pluck can not process non array', (done) => {
    expect(pluck.bind(null, {})).to.throw(TypeError);
    done();
  });

  it('Plucks a key from array of objects to it\'s own array', (done) => {
    let array = _array.map(item => item);
    const res = pluck(array, 'my_key');

    assert.equal(res.join(','), 'a,b,c,d');
    done();
  });

  it('Returns array of \'undefined\'s when key is missing', (done) => {
    let array = _array.map(item => item);
    const res = pluck(array, 'missing_key');

    assert.equal(res.map(item => typeof item).join(','), 'undefined,undefined,undefined,undefined');
    done();
  });

});
