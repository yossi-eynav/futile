'use strict';

const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const URI = require('./');

describe('uri', () => {

    it('uri exist', () => expect(URI).to.exist);

    it('store should be frozen and unreachable', () => {
        const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

        expect(_uri.store).to.be.frozen;
        expect(() => { _uri.store = {}; }).to.throw(TypeError);

        delete _uri.store;
        expect(_uri.store).to.exist;
    });

    it('uri instance should have no direct properties (requires Symbol support)', () => {
        const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');
        const expected_number_of_properties = typeof Symbol === 'function' ? 0 : 1;

        expect(Object.keys(_uri).length).to.be.equal(expected_number_of_properties);
    });

    it('params object should be frozen', () => {
        const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

        _uri.queryParams;
        expect(() => { _uri.store.queryParams = {param1: null}; }).to.throw(TypeError);
        expect(() => { _uri.store.queryParams.param1 = null; }).to.throw(TypeError);
    });

    it('should replace native toString function', () => {
        const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

        expect(_uri.toString())
            .to.be.equal('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');
        expect(`${_uri}`)
            .to.be.equal('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');
    });

    it('should return the original href string', () => {
        expect((new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4')).href)
            .to.be.equal('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');
    });

    it('should build store keys only after their first getter call', () => {
        ['hash', 'host', 'href', 'path', 'pathname', 'protocol', 'query', 'top'].forEach((prop) => {
            const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');
            expect(_uri.store).not.to.have.any.keys(['hash', 'host', 'path', 'pathname', 'protocol', 'query', 'top']);
            expect(_uri.store).to.have.keys(['href']);

            _uri[prop];
            expect(_uri.store).to.contain.keys([prop]);
        });
    });

    it('"static" properties getters work', () => {
        const map = new Map();

        map.set('href', 'https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');
        map.set('host', 'www.website.com');
        map.set('top', 'website.com');
        map.set('protocol', 'https:');
        map.set('path', 'https://www.website.com/page/file.ext');
        map.set('pathname', '/page/file.ext');
        map.set('query', 'param1=1&param2=2');
        map.set('hash', 'param3=3&param4=4');

        map.forEach((value, key) => {
            const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

            expect(_uri[key]).to.be.equal(value);
        });
    });

    it('should return queryParams, hashParams, and params (joined). Prefer hash values to query', () => {
        const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4&param2=5');

        _uri.queryParams.should.deep.equal({param1: '1', param2: '2'});
        _uri.hashParams.should.deep.equal({param3: '3', param4: '4', param2: '5'});
        _uri.params.should.deep.equal({param1: '1', param2: '5', param3: '3', param4: '4'});
    });


    it('should not allow to re set getter/static properties', () => {
        const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

        ['href', 'host', 'path', 'pathname', 'protocol', 'top'].forEach((prop) => {
            expect(() => { _uri[prop] = 'new'; }).to.throw(Error);
        });
    });

    describe('analyze', () => {
        const analyze = (href) => new URI(href);

        describe('path', () => {
            it('retrieves path from url', () => {
                analyze('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                    .path.should.equal('https://www.website.com/page/file.ext');
                analyze('www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                    .path.should.equal('www.website.com/page/file.ext');
                analyze('/page/file.ext.ext?param1=1&param2=2#param3=3&param4=4')
                    .path.should.equal('/page/file.ext.ext');
                analyze('/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                    .path.should.equal('/page/file.ext');
                analyze('/page/file?param1=1&param2=2#param3=3&param4=4')
                    .path.should.equal('/page/file');
                analyze('/page?param1=1&param2=2#param3=3&param4=4')
                    .path.should.equal('/page');
            });
        });

        describe('pathname', () => {
            it('retrieves pathname from url', () => {
                analyze('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                    .pathname.should.equal('/page/file.ext');
                analyze('www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                    .pathname.should.equal('/page/file.ext');
                analyze('/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                    .pathname.should.equal('/page/file.ext');
                analyze('/page/file.ext#param3=3&param4=4')
                    .pathname.should.equal('/page/file.ext');
                analyze('/page/file.ext')
                    .pathname.should.equal('/page/file.ext');
                analyze('/page/file')
                    .pathname.should.equal('/page/file');
                analyze('/page')
                    .pathname.should.equal('/page');
            });
        });

        describe('host', () => {
            it('retrieves host from url', () => {
                analyze('https://www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                    .host.should.equal('www.website.com');
                analyze('www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                    .host.should.equal('www.website.com');
                analyze('/page/file?param1=1&param2=2#param3=3&param4=4')
                    .host.should.equal('');
            });
        });

        describe('top', () => {
            it('retrieves top from url', () => {
                analyze('https://www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                    .top.should.equal('website.com');
                analyze('www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                    .top.should.equal('website.com');
                analyze('/page/file?param1=1&param2=2#param3=3&param4=4')
                    .top.should.equal('');
            });
        });

        describe('protocol', () => {
            it('retrieves protocol from url', () => {
                analyze('https://www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                    .protocol.should.equal('https:');
                analyze('http://www.website.com')
                    .protocol.should.equal('http:');
                analyze('ftp://www.website.com')
                    .protocol.should.equal('ftp:');
                analyze('ws://www.website.com')
                    .protocol.should.equal('ws:');
                analyze('www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                    .protocol.should.equal('');
                analyze('/page/file?param1=1&param2=2#param3=3&param4=4')
                    .protocol.should.equal('');
            });
        });

        describe('query', () => {
            it('retrieves query from url', () => {
                analyze('https://www.website.com?param1=1&param2=2#param3=3&param4=4')
                    .query.should.deep.equal('param1=1&param2=2');
                analyze('https://www.website.com?param1=1&param2=2')
                    .query.should.deep.equal('param1=1&param2=2');
                analyze('?param1=1&param2=2')
                    .query.should.deep.equal('param1=1&param2=2');
            });
        });

        describe('queryParams', () => {
            it('retrieves query parameters as object', () => {
                analyze('https://www.website.com?param1=1&param2=2#param3=3&param4=4')
                    .queryParams.should.deep.equal({param1: '1', param2: '2'});
                analyze('https://www.website.com?param1=1&param2=2')
                    .queryParams.should.deep.equal({param1: '1', param2: '2'});
                analyze('?param1=1&param2=2')
                    .queryParams.should.deep.equal({param1: '1', param2: '2'});
            });
        });

        describe('hash', () => {
            it('retrieves hash from url', () => {
                analyze('https://www.website.com?param1=1&param2=2#param3=3&param4=4')
                    .hash.should.deep.equal('param3=3&param4=4');
                analyze('https://www.website.com?param1=1&param2=2#!param3=3&param4=4')
                    .hash.should.deep.equal('param3=3&param4=4');
                analyze('https://www.website.com#param3=3&param4=4')
                    .hash.should.deep.equal('param3=3&param4=4');
                analyze('?param1=1&param2=2#param3=3&param4=4')
                    .hash.should.deep.equal('param3=3&param4=4');
                analyze('?param1=1&param2=2#page/section')
                    .hash.should.deep.equal('page/section');
                analyze('?param1=1&param2=2#25%')
                    .hash.should.deep.equal('25%');
            });
        });

        describe('hashParams', () => {
            it('retrieves hash parameters as object', () => {
                analyze('https://www.website.com?param1=1&param2=2#param3=3&param4=4')
                    .hashParams.should.deep.equal({param3: '3', param4: '4'});
                analyze('https://www.website.com?param1=1&param2=2#!param3=3&param4=4')
                    .hashParams.should.deep.equal({param3: '3', param4: '4'});
                analyze('https://www.website.com#param3=3&param4=4')
                    .hashParams.should.deep.equal({param3: '3', param4: '4'});
                analyze('?param1=1&param2=2#param3=3&param4=4')
                    .hashParams.should.deep.equal({param3: '3', param4: '4'});
                analyze('?param1=1&param2=2#page/section')
                    .hashParams.should.deep.equal({'page/section': true});
                analyze('?param1=1&param2=2#25%')
                    .hashParams.should.deep.equal({'25%': true});
            });
        });
    });

    describe('params manipulations', () => {
        describe('hasParams', () => {
            it('should read params', () => {
                let _uri;
                _uri = new URI('https://www.website.com/page/file.ext');
                _uri.hasParams().should.equal(false);

                _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');
                _uri.hasParams().should.equal(true);
                _uri.params.should.contain.keys(['param1', 'param2', 'param3', 'param4']);
            });
        });

        describe('removeParams', () => {
            it('should remove params', () => {
                const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

                _uri.removeParams('param2', 'param4');
                _uri.params.should.not.have.any.keys(['param2', 'param4']);
                _uri.params.should.have.any.keys(['param1', 'param3']);
            });
        });

        describe('addParams', () => {
            it('should add params to query (explicit)', () => {
                const _uri = new URI('https://www.website.com/page/file.ext?param1=1');

                _uri.queryParams.should.have.keys(['param1']);
                _uri.addParams({param2: 2}, '?');
                _uri.queryParams.should.have.keys(['param1', 'param2']);
            });
        });

        describe('set params', () => {
            it('should add params to query (implicit)', () => {
                const _uri = new URI('https://www.website.com/page/file.ext?param1=1');

                _uri.params = {param2: 2};
                expect(`${_uri}`).to.be.equal('https://www.website.com/page/file.ext?param1=1&param2=2');
            });
        });

        describe('addParams hash params', () => {
            it('should add params to hash (explicit)', () => {
                const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3');

                _uri.hashParams.should.have.keys(['param3']);
                _uri.addParams({param4: 4}, '#');
                _uri.hashParams.should.have.keys(['param3', 'param4']);
            });
        });

        describe('set hashParams', () => {
            it('should add params to hash (implicit)', () => {
                const _uri = new URI('https://www.website.com/page/file.ext#param1=1');

                _uri.hashParams = {param2: 2};
                expect(`${_uri}`).to.be.equal('https://www.website.com/page/file.ext#param1=1&param2=2');
            });
        });

        describe('removeParams', () => {
            it('should remove all params from one of the mods', () => {
                const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

                _uri.removeParams('param1', 'param2', 'param3');
                `${_uri}`.should.equal('https://www.website.com/page/file.ext#param4=4');
            });

            it('should rebuild the URI\'s href without params prefixes', () => {
                let _uri;

                _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2');
                _uri.removeParams('param1', 'param2');
                _uri.toString()
                    .should.equal('https://www.website.com/page/file.ext');

                _uri = new URI('https://www.website.com/page/file.ext#param1=1&param2=2');
                _uri.removeParams('param1', 'param2');
                _uri.toString()
                    .should.equal('https://www.website.com/page/file.ext');

                _uri = new URI('https://www.website.com/page/file.ext?param1=1#param2=2');
                _uri.removeParams();
                _uri.toString()
                    .should.equal('https://www.website.com/page/file.ext');
            });
        });

        describe('calculation (performance)', () => {
            it('setting (query or hash) params does not require recalculation', () => {
                const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4');

                _uri.store.should.not.to.contain.keys('queryParams');
                _uri.queryParams = {param5: 5};
                _uri.store.should.contain.keys('queryParams');

                _uri.store.should.not.to.contain.keys('hashParams');
                _uri.hashParams = {param6: 6};
                _uri.store.should.contain.keys('hashParams');
            });
        });

        describe('href rebuild', () => {
            it('should rebuild the URI\'s href', () => {
                const _uri = new URI('https://www.website.com/page/file.ext?param1=1&param2=2');

                _uri.addParams({param5: 5});
                _uri.toString()
                    .should.equal('https://www.website.com/page/file.ext?param1=1&param2=2&param5=5');

                _uri.addParams({param1: 6}, '#');
                _uri.toString()
                    .should.equal('https://www.website.com/page/file.ext?param1=1&param2=2&param5=5#param1=6');
            });
        });
    });
});
