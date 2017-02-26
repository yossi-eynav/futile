'use strict';

const assert = require('chai').assert;
const _global = require('./');

describe('_global', () => {

  global.data_member = 'a value';

  it('Exports an object', () => assert.equal(typeof _global, 'object'));

  it('exposes the global object', (done) => {
    const same = _global === global;

    assert.equal(same, true);
    done();
  });

  it('global and _global share the interface', (done) => {
    assert.equal(_global.data_member, global.data_member);
    done();
  });

});
