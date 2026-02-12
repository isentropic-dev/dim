/**
 * Quantity operations for ISQ.
 *
 * @example Deriving quantities with arithmetic
 * ```ts
 * import { force, length, time } from "@isentropic/dim-isq";
 * import { divide, multiply } from "@isentropic/dim-isq/ops";
 *
 * const v = divide(length(100), time(10));
 * ```
 *
 * @module
 */

export {
  add,
  divide,
  multiply,
  scale,
  subtract,
} from "@isentropic/dim-quantity/ops";
