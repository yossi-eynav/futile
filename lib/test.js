'use strict';

const assert = require('chai').assert;
const index = require('./index');

function first(collection) {
    return Object.keys(collection)[0];
}

describe('lib interface', () => {
    [
        'flow',
        'interpolate',
        'pluck',
        'resolve',
        'safe',
        'sequence',
        'shuffle'
    ].forEach((method) => {
        const fn = index[method];
        it(`Exports ${method} function`, () => assert.typeOf(fn, 'function'));
    });

});
