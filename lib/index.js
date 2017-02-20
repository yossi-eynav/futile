/**
 * @module index
 * @since 1.0.0
 * @description A nested collection of helpers
 */

/**
 * Helpers
 *
 * @requires lib/flow
 * @requires lib/interpolate
 * @requires lib/pluck
 * @requires lib/resolve
 * @requires lib/safe
 * @requires lib/shuffle
 */
module.exports = {
    flow: require('./flow'),
    interpolate: require('./interpolate'),
    pluck: require('./pluck'),
    resolve: require('./resolve'),
    safe: require('./safe'),
    shuffle: require('./shuffle')
};
