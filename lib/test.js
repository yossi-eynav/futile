'use strict';

const assert = require('chai').assert;
const index = require('./index');
const flat = require('./flat');

function first(collection) {
    return Object.keys(collection)[0];
}

describe('lib interface', () => {

  [
    'str',
    'arr',
    'func'
  ].forEach((type) => {
    const lib = index[type];
    it(`Exports ${type} object`, () => assert.typeOf(lib, 'object'));
    it(`${type} exports at least one function`, () => assert.typeOf(lib[first(lib)], 'function'));
  });

});

describe('flat interface', () => {

  [
    'shuffle',
    'safe',
    'resolve'
  ].forEach((method) => {
    const fn = flat[method];
    it(`Exports ${method} function`, () => assert.typeOf(fn, 'function'));
  });

});
