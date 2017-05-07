/**
 * @module lib/uri/analyze
 * @description Analyse parts of the href string
 * @since 1.4.0
 */

/**
 * Create _regexGetter methods
 * @private
 * @param  {RegExp} pattern
 * @param  {Number} location in regex result to retrieve
 * @return {String} Match or empty string
 */
function _regexGetter(pattern, location) {
    return (string) => {
        const match = string.match(pattern);

        return match && match[location] || '';
    };
}

/**
 * _store regex getter methods
 * @constant
 * @type {Object}
 */
const _store = {};

/**
 * @class Analyze
 * @classdesc Expose a collection of methods to get parts of a URI struct
 *
 * @example (new Analyze()).path('www.website.com/page?param1=1')
 * // www.website.com/page
 */
class Analyze {

    /**
     * @type {Function}
     * @description
     * Get hash string from href
     * @example
     * hash('https://www.website.com/page/file.ext?param1=1#location'); // 'location'
     */
    get hash() {
        return _store.hash = _store.hash || _regexGetter(/^.*[\#\!|\#](.*)/, 1); // eslint-disable-line no-useless-escape
    }

    /**
     * @type {Function}
     * @description
     * Get query string from href
     * @example
     * query('https://www.website.com/page/file.ext?param1=1#location'); // 'param1=1'
     */
    get query() {
        return _store.query = _store.query || _regexGetter(/^.*\?(.*(?=#)|(.*(?=$)))/, 1); // eslint-disable-line no-useless-escape
    }

    /**
     * @type {Function}
     * @description
     * Get host string from href
     * @example
     * host('https://www.website.com/page/file.ext?param1=1#location'); // 'www.website.com'
     */
    get host() {
        return _store.host = _store.host || _regexGetter(/^(.*:[\/]{2}|[\/]{2})?([\w|-|\.]*).*$/, 2); // eslint-disable-line no-useless-escape
    }

    /**
     * @type {Function}
     * @description
     * Get top level string from host
     * @example
     * top('www.website.com'); // 'website.com'
     */
    get top() {
        return _store.top = _store.top || _regexGetter(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/, 0); // eslint-disable-line no-useless-escape
    }

    /**
     * @type {Function}
     * @description
     * Get protocol string from href
     * @example
     * protocol('https://www.website.com/page/file.ext?param1=1#location'); // 'https:'
     */
    get protocol() {
        return _store.protocol = _store.protocol || _regexGetter(/^(.*:)[\/]{2}|[\/]{2}?.*$/, 1); // eslint-disable-line no-useless-escape
    }

    /**
     * @type {Function}
     * @description
     * Get path string from href
     * @example
     * path('https://www.website.com/page/file.ext?param1=1#location'); // 'https://www.website.com/page/file.ext'
     */
    get path() {
        return _store.path = _store.path || ((href) => href.replace(/[\?|#].*$/, '')); // eslint-disable-line no-useless-escape
    }

    /**
     * @type {Function}
     * @description
     * Get pathname string from path and host
     * @example
     * pathname('https://www.website.com/page/file.ext', 'www.website.com'); // '/page/file.ext'
     */
    get pathname() {
        return _store.pathname = _store.pathname || ((path, host) => host ? path.replace(new RegExp(`.*${host}`), '') : path);
    }
}

/**
 * [interface description]
 * @type {Object}
 *
 * @example analyze.path('www.website.com/page?param1=1')
 * // www.website.com/page
 */
module.exports = new Analyze();
