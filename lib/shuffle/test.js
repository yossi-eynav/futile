'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const shuffle = require('./');

describe('shuffle', () => {

  it('Exports shuffle function', () => assert.typeOf(shuffle, 'function'));

  it('shuffle can process array', (done) => {
    expect(shuffle.bind(null, [])).to.not.throw(TypeError);
    done();
  });

  it('shuffle can not process non array', (done) => {
    expect(shuffle.bind(null, {})).to.throw(TypeError);
    done();
  });

  it('Returns shuffled array', (done) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const res = shuffle(array, false);

    assert.notEqual(array.join(','), res.join(','));
    done();
  });

  it('Shuffled array is the same length', (done) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const res = shuffle(array, false);

    assert.equal(array.length, res.length);
    done();
  });

  it('Shuffles array and mutates the original', (done) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const orig = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(array);

    assert.notEqual(array.join(','), orig.join(','));
    done();
  });

  it('Shuffles array without mutation', (done) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const orig = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(array, false);

    assert.equal(array.join(','), orig.join(','));
    done();
  });

});
