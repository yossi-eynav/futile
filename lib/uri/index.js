/**
 * @module lib/uri
 * @since 1.4.0
 * @requires lib/select
 * @requires lib/uri/analyze
 * @requires lib/uri/to-query-string
 * @requires lib/uri/query-string-to-obj
 */
const select = require('../select');
const analyze = require('./analyze');
const toQueryString = require('./to-query-string');
const queryStringToObj = require('./query-string-to-obj');

/**
 * Key to use for stored calculated values of URI struct
 * @type {Symbol}
 */
const store = typeof Symbol === 'function' ? Symbol() : '_store';

/**
 * Map param types from symbols to names
 * @private
 * @constant
 * @type {Object}
 */
const QUERY_TYPE_DICTIONARY = {
    '#!': 'hashParams',
    '#': 'hashParams',
    '?': 'queryParams'
};

/**
 * error message builder
 * @private
 * @type {String}
 */
const _readonlyError = (prop) => `Cannot assign to read only property '${prop}' of object '#<URI>'`;

/**
 * Assign key value pair to Self store object, and recreate a frozen store
 * @private
 * @param  {URI} self context
 * @param  {String} prop Property to set
 * @param  {Any} value
 * @param  {Boolean} [force=true] should set even if the property exists
 * @return {URI}
 */
function _assign(self, prop, getter, force = false) {
    if (force || !self.store.hasOwnProperty(prop)) {
        self[store] = Object.freeze(
            Object.assign(
                {},
                self.store,
                {[prop]: getter()}
            )
        );
    }

    return self;
}

/**
 * rebuild href string according to new parameters
 * @private
 * @param  {URI} self context
 * @param  {Strong[]} props Properties to use in the rebuilt solution (skip re calculation)
 * @return {URI}
 */
function _rebuild(self, ...props) {
    self[store] = Object.freeze(
        Object.assign(...[{
            href: [
                self.path,
                (self.hasQueryParams() ? `?${toQueryString(self.queryParams)}` : ''),
                (self.hasHashParams() ? `#${toQueryString(self.hashParams)}` : '')
            ].join('')
        }]
        .concat(
            props.map(
                (prop) => ({[prop]: self.store[prop]})
            )
        )
    ));

    return self;
}

/**
 * @class URI
 * @classdesc URI parser with params manipulation
 *
 * @param {String} href Full URI string
 *
 * @example const uri = new URI('website.com/page?param1=1');
 * uri.host;     // 'website.com'
 * uri.pathname; // '/page'
 * uri.params;   // {param1: '1'}
 * uri.params;   // {param1: '1', param2: '2'}
 */
class URI {
    constructor(href) {
        this[store] = Object.freeze({href});
    }

    /**
     * a pointer to store property
     * @return {Object} store
     */
    get store() {
        return this[store];
    }

    set store(o) {
        throw new TypeError(_readonlyError('store'));
    }

    /**
     * @type {String}
     * @readonly
     */
    get href() {
        return this.store.href;
    }

    set href(o) {
        throw new TypeError(_readonlyError('href'));
    }

    /**
     * @type {String}
     * @readonly
     */
    get path() {
        return _assign(this, 'path', () => analyze.path(this.href)).store.path;
    }

    set path(o) {
        throw new TypeError(_readonlyError('path'));
    }

    /**
     * @type {String}
     * @readonly
     */
    get pathname() {
        this.path; // Should pre calculate
        this.host; // Should pre calculate

        return _assign(this, 'pathname', () => analyze.pathname(this.path, this.host)).store.pathname;
    }

    set pathname(o) {
        throw new TypeError(_readonlyError('pathname'));
    }

    /**
     * @type {String}
     * @readonly
     */
    get host() {
        this.path; // Should pre calculate

        return _assign(this, 'host', () => analyze.host(this.path)).store.host;
    }

    set host(o) {
        throw new TypeError(_readonlyError('host'));
    }

    /**
     * @type {String}
     * @readonly
     */
    get top() {
        this.host; // Should pre calculate

        return _assign(this, 'top', () => analyze.top(this.host)).store.top;
    }

    set top(o) {
        throw new TypeError(_readonlyError('top'));
    }

    /**
     * @type {String}
     * @readonly
     */
    get protocol() {
        this.path; // Should pre calculate

        return _assign(this, 'protocol', () => analyze.protocol(this.path)).store.protocol;
    }

    set protocol(o) {
        throw new TypeError(_readonlyError('protocol'));
    }

    /**
     * @type {String}
     * @readonly
     */
    get query() {
        return _assign(this, 'query', () => analyze.query(this.href)).store.query;
    }

    set query(o) {
        throw new TypeError(_readonlyError('query'));
    }


    /**
     * @type {Object}
     */
    get queryParams() {
        this.query; // Should pre calculate

        return _assign(this, 'queryParams', () => Object.freeze(queryStringToObj(this.query))).store.queryParams;
    }

    set queryParams(obj) {
        this.queryParams; // Should pre calculate

        _rebuild(_assign(this, 'queryParams', () => Object.assign({}, this.queryParams, obj), true), 'queryParams');
    }

    /**
     * @type {String}
     * @readonly
     */
    get hash() {
        return _assign(this, 'hash', () => analyze.hash(this.href)).store.hash;
    }

    set hash(o) {
        throw new TypeError(_readonlyError('hash'));
    }

    /**
     * @type {Object}
     */
    get hashParams() {
        this.hash; // Should pre calculate

        return _assign(this, 'hashParams', () => Object.freeze(queryStringToObj(this.hash))).store.hashParams;
    }

    set hashParams(obj) {
        this.hashParams; // Should pre calculate

        _rebuild(_assign(this, 'hashParams', () => Object.assign({}, this.hashParams, obj), true), 'hashParams');
    }

    /**
     * @type {Object}
     */
    get params() {
        this.queryParams; // Should pre calculate
        this.hashParams; // Should pre calculate

        return Object.assign({}, this.queryParams, this.hashParams);
    }

    set params(obj) {
        this.params; // Should pre calculate

        const method = !this.hasQueryParams() && this.hasHashParams() ? 'hash' : 'query';

        this[`${method}Params`] = obj;
    }

    /**
     * Override native 'toString' function
     * @return {String} The full href string
     *
     * @example const uri = new URI('website.com/page?param1=1');
     * uri.toString(); // 'website.com/page?param1=1&param2=2'
     * '' + uri; // 'website.com/page?param1=1&param2=2'
     * `${uri}`; // 'website.com/page?param1=1&param2=2'
     */
    toString() {
        return this.href;
    }

    /**
     * hasQueryParams
     * @return {Boolean} the query object has any members
     *
     * @example uri.hasQueryParams();
     */
    hasQueryParams() {
        return Object.keys(this.queryParams).length > 0;
    }

    /**
     * hasHashParams
     * @return {Boolean} the hash object has any members
     *
     * @example uri.hasHashParams();
     */
    hasHashParams() {
        return Object.keys(this.hashParams).length > 0;
    }

    /**
     * add params to query or hash by interface
     * @param {Object} obj key value pairs
     * @param {String} mod which param set to address
     *
     * @example uri.addParams({key: 'value'});
     * uri.addParams({key: 'value'}, '?');
     */
    addParams(obj, mod) {
        this.params; // Should pre calculate

        const method = QUERY_TYPE_DICTIONARY[mod] || 'params';

        this[method] = obj;

        return this;
    }

    /**
     * @return {Boolean} Has any query or hash params
     *
     * @example uri.hasParams();
     */
    hasParams() {
        return Object.keys(this.params).length > 0;
    }

    /**
     * remove params from query and hash
     * @param  {String[]} keys to remove
     * @return {Self}
     *
     * @example uri.removeParams('param_a', 'param_b');
     */
    removeParams(...keys) {
        this.params; // Should pre calculate


        if (!keys.length) {

            // Remove all
            this[store] = Object.freeze(
                Object.assign(...[
                    {},
                    this.store,
                    {
                        hashParams: {},
                        queryParams: {}
                    }
                ])
            );
        } else {
            this[store] = Object.freeze(
                Object.assign(...[
                    {},
                    this.store
                ].concat(
                    ['hashParams', 'queryParams'].map((prop) => ({
                        [prop]: select(this[prop], (key) => !~keys.indexOf(key))
                    }))
                ))
            );
        }

        return _rebuild(this, 'queryParams', 'hashParams');
    }
}

module.exports = URI;
