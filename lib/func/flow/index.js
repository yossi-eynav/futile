/**
 * @module func/flow
 * @since 0.0.2
 */

/**
 * @class Flow
 * @classdesc Create readable flows
 *
 * @description
 * 'next' function accepts Any arguments you passed on,
 *     appends next registered step as last argument
 *
 * @property {Array} stack The flow's stack of steps
 *
 * @example new Flow()
 *  .step(next => setTimeout(next, 40)
 *  .step(next => next(1)
 *  .step((i, next) => console.log(i))
 *  .go();
 */
class Flow {
    constructor() {
        this.stack = [];
    }

    /**
     * Register a step function
     * @param  {Function} fn Register a step function
     * @return {Flow} Returns the instance
     */
    step(fn) {
        this.stack.push(fn);
        return this;
    }

    /**
     * Initiate the flow
     * @param  {...Any} args Any argument you want to be passed on
     * @return {Any} The return value of the last function in a synchronous flow
     */
    go(...args) {
        if (this.stack.length < 1) {
            return;
        }
        args.push(this.go.bind(this));
        args.unshift(this.stack.shift(), null);
        return args.shift().bind(...args)();
    }
}

/**
 * flow
 * @instance
 * @summary Create readable flows
 * @return {Flow} Flow instance
 *
 * @example flow()
 *  .step(next => setTimeout(next, 40)
 *  .step(next => next(1)
 *  .step((i, next) => console.log(i))
 *  .go();
 *
 * // 'next' function accepts Any arguments you passed on,
 * //  appends next registered step as last argument
 */
module.exports = () => new Flow();
