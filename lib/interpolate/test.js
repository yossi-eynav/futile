'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const interpolate = require('./');

describe('interpolate', () => {

  const name = 'Martin';

  it('Exports interpolate function', () => assert.typeOf(interpolate, 'function'))

  it('Interpolate can process string', (done) => {
    expect(interpolate.bind(null, '')).to.not.throw(TypeError);
    done();
  });

  it('Interpolate can not process non string', (done) => {
    expect(interpolate.bind(null, {})).to.throw(TypeError);
    done();
  });

  it('Interpolate string with \'$\' notation (ES)', (done) => {
    const res = interpolate('Hello, ${name}', {name: name});
    assert.equal(res, `Hello, ${name}`);
    done();
  });

  it('Interpolate string with \'%\' notation (YML)', (done) => {
    const res = interpolate('Hello, %{name}', {name: name});
    assert.equal(res, `Hello, ${name}`);
    done();
  });

  it('Interpolate string with \'{{}}\' notation (Handlebars)', (done) => {
    const res = interpolate('Hello, {{name}}', {name: name});
    assert.equal(res, `Hello, ${name}`);
    done();
  });

  it('Return Interpolated string with missing results untouched', (done) => {
    const res = interpolate('Hello, ${name} ${last_name}', {name: name});
    assert.equal(res, `Hello, ${name} \${last_name}`);
    done();
  });

  it('Return original string when no data passed', (done) => {
    const string = 'Hello, ${name}';
    const res = interpolate(string);
    assert.equal(res, string);
    done();
  });

});
