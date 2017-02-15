'use strict';

const assert = require('chai').assert;
const shuffle = require('./');

describe('arr shuffle', () => {

  const _array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  it('Exports shuffle function', () => assert.typeOf(shuffle, 'function'));

  it('Returns shuffled array', (done) => {
    let array = _array.map(item => item);
    const res = shuffle(array, false);

    assert.notEqual(array.join(','), res.join(','));
    done();
  });

  it('Shuffles array and mutates the original', (done) => {
    let array = _array.map(item => item);
    shuffle(array);

    assert.notEqual(_array.join(','), array.join(','));
    done();
  });

  it('Shuffles array without mutation', (done) => {
    let array = _array.map(item => item);
    shuffle(array, false);

    assert.equal(_array.join(','), array.join(','));
    done();
  });

});
