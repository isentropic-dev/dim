/**
 * Unit operations for SI.
 *
 * @example
 * ```ts
 * import { kilometer, meter } from "@isentropic/dim-si/length";
 * import { hour } from "@isentropic/dim-si/time";
 * import { meterPerSecond } from "@isentropic/dim-si/velocity";
 * import { q, valueIn } from "@isentropic/dim-si/ops";
 *
 * // Fluent chaining
 * const speed = q(kilometer(100)).div(hour(2));
 * q(kilometer(5)).plus(meter(500)).in(meter); // 5500
 *
 * // Free functions
 * const total = add(kilometer(5), meter(500));
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
export { q } from "@isentropic/dim-unit/chain";
export type { QAffine, QLinear } from "@isentropic/dim-unit/chain";
