/**
 * @module lib/interpolate
 * @since 1.0.0
 */

/**
 * @access private
 * @member {Array} Valid_result_types string, number
 */
const VALID_RESULT_TYPES = Object.seal(['string', 'number']);

/**
 * String interpolation in 3 flavours
 * @access public
 *
 * @param  {String} template string
 * @param  {Object} data object with flat key:value pairs
 * @return {String} interpolated result
 *
 * @example JS flavour: interpolate('Hello, ${name}', {name: 'Martin'})
 * @example YML flavour: interpolate('Hello, %{name}', {name: 'Martin'})
 * @example Handlebars flavour: interpolate('Hello, {{name}}', {name: 'Martin'})
 */
function interpolate(string = '', data) {
    if (typeof string !== 'string') {
        throw new TypeError(`commodity#interpolate expects first argument to be a string, got a ${typeof string}`);
    }

    if (!data) {
        return string;
    }

    function replace(haystack, needle) {
        const replacement = data[needle.trim()];
        return ~VALID_RESULT_TYPES.indexOf(typeof replacement) ? replacement : haystack;
    }

    return string
        .replace(/\${([^{}]*)}/g, replace)
        .replace(/%{([^{}]*)}/g, replace)
        .replace(/{{([^{}]*)}}/g, replace)
        ;
}

module.exports = interpolate;
