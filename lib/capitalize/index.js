/**
 * @module lib/capitalize
 * @since 1.4.0
 */

/**
 * Uppercase first character
 * @private
 * @param  {String} string Any string
 * @return {String} A string where the first character is uppercased
 */
const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Uppercase first character of each word in a string
 * @param  {String} string A word or a sentence
 * @return {String} string capitalising every first letter of a word in a sentence
 */
module.exports = (string = '', all = false) => all ? string.split(' ').map(cap).join(' ') : cap(string);
