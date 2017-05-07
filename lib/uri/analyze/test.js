'use strict';

const should = require('chai').should(); // eslint-disable-line no-unused-vars

const analyze = require('./');

describe('uri/analyze', () => {
    describe('path', () => {
        it('retrieves path from url', () => {
            analyze.path('https://www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                .should.equal('https://www.website.com/page/file.ext');
            analyze.path('www.website.com/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                .should.equal('www.website.com/page/file.ext');
            analyze.path('/page/file.ext.ext?param1=1&param2=2#param3=3&param4=4')
                .should.equal('/page/file.ext.ext');
            analyze.path('/page/file.ext?param1=1&param2=2#param3=3&param4=4')
                .should.equal('/page/file.ext');
            analyze.path('/page/file?param1=1&param2=2#param3=3&param4=4')
                .should.equal('/page/file');
            analyze.path('/page?param1=1&param2=2#param3=3&param4=4')
                .should.equal('/page');
        });
    });

    describe('host', () => {
        it('retrieves host from url', () => {
            analyze.host('https://www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                .should.equal('www.website.com');
            analyze.host('www.website.com/page/file?param1=1&param2=2#param3=3&param4=4')
                .should.equal('www.website.com');
            analyze.host('/page/file?param1=1&param2=2#param3=3&param4=4')
                .should.equal('');
        });
    });

    describe('pathname', () => {
        it('retrieves pathname from path and host', () => {
            analyze.pathname('www.website.com/page/file.ext', 'www.website.com')
                .should.equal('/page/file.ext');
            analyze.pathname('/page/file.ext')
                .should.equal('/page/file.ext');
            analyze.pathname('/page/file.ext')
                .should.equal('/page/file.ext');
            analyze.pathname('/page/file.ext')
                .should.equal('/page/file.ext');
            analyze.pathname('/page/file')
                .should.equal('/page/file');
            analyze.pathname('/page')
                .should.equal('/page');
        });
    });

    describe('top', () => {
        it('retrieves top from host', () => {
            analyze.top('www.website.com')
                .should.equal('website.com');
            analyze.top('uk.222.website.com')
                .should.equal('website.com');
            analyze.top('website.com')
                .should.equal('website.com');
            analyze.top('')
                .should.equal('');
        });
    });

    describe('protocol', () => {
        it('retrieves protocol from path', () => {
            analyze.protocol('https://www.website.com/page/file')
                .should.equal('https:');
            analyze.protocol('http://www.website.com')
                .should.equal('http:');
            analyze.protocol('ftp://www.website.com')
                .should.equal('ftp:');
            analyze.protocol('ws://www.website.com')
                .should.equal('ws:');
            analyze.protocol('www.website.com/page/file')
                .should.equal('');
            analyze.protocol('/page/file')
                .should.equal('');
        });
    });

    describe('query', () => {
        it('retrieves query from url', () => {
            analyze.query('https://www.website.com?param1=1&param2=2#param3=3&param4=4')
                .should.deep.equal('param1=1&param2=2');
            analyze.query('https://www.website.com?param1=1&param2=2')
                .should.deep.equal('param1=1&param2=2');
            analyze.query('?param1=1&param2=2')
                .should.deep.equal('param1=1&param2=2');
        });
    });

    describe('hash', () => {
        it('retrieves hash from url', () => {
            analyze.hash('https://www.website.com?param1=1&param2=2#param3=3&param4=4')
                .should.deep.equal('param3=3&param4=4');
            analyze.hash('https://www.website.com?param1=1&param2=2#!param3=3&param4=4')
                .should.deep.equal('param3=3&param4=4');
            analyze.hash('https://www.website.com#param3=3&param4=4')
                .should.deep.equal('param3=3&param4=4');
            analyze.hash('?param1=1&param2=2#param3=3&param4=4')
                .should.deep.equal('param3=3&param4=4');
            analyze.hash('?param1=1&param2=2#page/section')
                .should.deep.equal('page/section');
            analyze.hash('?param1=1&param2=2#25%')
                .should.deep.equal('25%');
        });
    });
});
