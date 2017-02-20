'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const resolve = require('./');

describe('resolve', () => {

  const data_structure = {
    top: {
      middle: {
        low: 'value'
      }
    }
  };

  it('Exports resolve function', () => assert.typeOf(resolve, 'function'));

  it('resolve can process string', (done) => {
    expect(resolve.bind(null, '')).to.not.throw(TypeError);
    done();
  });

  it('resolve can not process non string', (done) => {
    expect(resolve.bind(null, {})).to.throw(TypeError);
    done();
  });

  it('Resolves to nested data structure', (done) => {
    const res = resolve('top.middle', data_structure);
    assert.equal(JSON.stringify(res), JSON.stringify({low: 'value'}));
    done();
  });

  it('Resolves to an object', (done) => {
    const res = resolve('top.middle.low', data_structure);
    assert.equal(res, 'value');
    done();
  });

  it('Resolves from global object', (done) => {
    global.some = {nested: 'value'};

    const res = resolve('some.nested');
    assert.equal(res, 'value');
    done();
  });

  it('Resolves missing data to \'undefined\'', (done) => {
    const res = resolve('missing.data', data_structure);
    assert.equal(res, undefined);
    done();
  });

});
