'use strict';

const assert = require('chai').assert;
const index = require('./index');

function first(collection) {
    return Object.keys(collection)[0];
}

describe('lib interface', () => {

  [
    'shuffle',
    'safe',
    'resolve'
  ].forEach((method) => {
    const fn = index[method];
    it(`Exports ${method} function`, () => assert.typeOf(fn, 'function'));
  });

});
