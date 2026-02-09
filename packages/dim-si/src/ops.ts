/**
 * Unit operations for SI.
 *
 * @example
 * ```ts
 * import { meter, kilometer } from "@isentropic/dim-si/length";
 * import { hour } from "@isentropic/dim-si/time";
 * import { add, divide, valueIn } from "@isentropic/dim-si/ops";
 *
 * const d = add(kilometer(5), meter(500));
 * const speed = divide(kilometer(100), hour(2));
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
} from "@isentropic/dim-unit/ops";
export { valueIn } from "@isentropic/dim-unit";
