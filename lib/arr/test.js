'use strict';

const assert = require('chai').assert;

describe('arr interface', () => {

  const _interface = require('./index');
  const keys = Object.keys(_interface);
  const fn = _interface[keys[0]];

  it('Exports a function', () => assert.typeOf(fn, 'function'));

});
