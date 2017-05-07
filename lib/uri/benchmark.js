'use strict';

const should = require('chai').should(); // eslint-disable-line no-unused-vars

const URI = require('./');

const benchmark = (method, count = 100000) => {
    while (count--) {
        method();
    }
};

const EXAMPLE_URL = 'https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4';

const _uri = () => new URI(EXAMPLE_URL);

describe('uri', () => {

    it('100,000 rounds each');

    describe('properties analysis', () => {
        [
            'host',
            'path',
            'pathname',
            'top',
            'hash',
            'query',
            'hashParams',
            'queryParams',
            'params'
        ].forEach((prop) => {
            it(prop, () => {
                benchmark(() => _uri()[prop]);
            });
        });
    });

    describe('parameter manipulation', () => {
        it('set query', () => {
            benchmark(() => _uri().queryParams = {param5: 5});
        });
        it('set hash', () => {
            benchmark(() => _uri().hashParams = {param5: 5});
        });
        it('set params', () => {
            benchmark(() => _uri().params = {param5: 5});
        });
        it('addParams', () => {
            benchmark(() => _uri().addParams({param5: 5}, '?'));
        });
        it('removeParams (all)', () => {
            benchmark(() => _uri().removeParams());
        });
        it('removeParams', () => {
            benchmark(() => _uri().removeParams('param1'));
        });
        it('removeParams (two params)', () => {
            benchmark(() => _uri().removeParams('param1', 'param3'));
        });
    });
});
