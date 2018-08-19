/**
 * NOTE: TAKEN FROM MY GIST https://gist.github.com/joeyjiron06/9de8d82d292ac0325c66816ed1f287d4
 * wrote this myself.
 *
 * @example
 * const debouncer = debounce(1000, (myArg) => {
 *   console.log('i am debounced with ', myArg);
 * });
 *
 * debouncer(1);
 * debouncer(2);
 * debouncer(3);
 *
 * // one second later...
 * //prints "i am debounced with 3"
 *
 * @param {number} delay - milliseconds to delay the call
 * @param {function} fn - the callback to be fired when delay fires
 * @return {function} a function to call multiple times
 */
export default function debounce(delay, fn) {
  if (typeof delay !== 'number') {
    throw new Error('you must pass in a number');
  }

  if (typeof fn !== 'function') {
    throw new Error('you must pass in a function');
  }

  let timer;
  let destroyed = false;

  /**
   * A debouncer function that wraps the function you passed in. Will add
   * a delay to your called method unless you call destroy, in which case
   * your function wont fire.
   */
  function debouncer() {
    if (destroyed) {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arguments);
    }, delay);
  }

  /**
   * Destroy the debouncer. This will ensure that your debounced function
   * will never get called again. you will have to call debounce again to
   * get a new debounced function. Useful for UI components that get destroyed.
   */
  debouncer.destroy = function() {
    if (!destroyed) {
      clearTimeout(timer);
      timer = null;
      destroyed = true;
    }
  };

  return debouncer;
}
