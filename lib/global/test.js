'use strict';

const expect = require('chai').expect;

const _global = require('./');

describe('_global', () => {

    it('_global exist', () => expect(_global).to.exist);

    it('Exports an object', () => expect(typeof _global).to.equal('object'));

    it('exposes the global object', () => expect(_global).to.equal(global));

    it('works without self', () => {
        global.self = null;

        expect(_global).to.equal(global);
    });

    it('works without window', () => {
        global.window = null;

        expect(_global).to.equal(global);
    });

    it('global and _global share the interface', () => {
        global.data_member = 'a value';

        expect(_global.data_member).to.equal(global.data_member);
    });

});
