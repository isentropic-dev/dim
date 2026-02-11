/**
 * Unit operations for SI quantities.
 *
 * Provides arithmetic functions and unit conversion for SI quantities.
 * These are re-exports from `@isentropic/dim-unit` — no SI-specific logic,
 * just a convenient single import point.
 *
 * ## Free functions
 *
 * - {@linkcode add} / {@linkcode subtract} — same-dimension arithmetic
 * - {@linkcode multiply} / {@linkcode divide} — cross-dimension arithmetic
 * - {@linkcode scale} — multiply a quantity by a number
 * - {@linkcode valueIn} — extract the numeric value in a target unit
 *
 * ## Fluent chaining
 *
 * Wrap a quantity with {@linkcode q} for a chainable API:
 *
 * @example Adding and converting
 * ```ts
 * import { kilometer, meter } from "@isentropic/dim-si/length";
 * import { add, valueIn } from "@isentropic/dim-si/ops";
 *
 * const total = add(kilometer(5), meter(500));
 * valueIn(total, kilometer);  // 5.5
 * valueIn(total, meter);      // 5500
 * ```
 *
 * @example Cross-dimension arithmetic
 * ```ts
 * import { newton } from "@isentropic/dim-si/force";
 * import { kilogram } from "@isentropic/dim-si/mass";
 * import { meterPerSecondSquared } from "@isentropic/dim-si/acceleration";
 * import { multiply, valueIn } from "@isentropic/dim-si/ops";
 *
 * const force = multiply(kilogram(10), meterPerSecondSquared(9.81));
 * valueIn(force, newton);  // 98.1
 * ```
 *
 * @example Affine (temperature) operations
 * ```ts
 * import { celsius, kelvin } from "@isentropic/dim-si/temperature";
 * import { add, subtract, valueIn } from "@isentropic/dim-si/ops";
 *
 * // Subtracting two absolute temperatures gives a linear difference
 * const diff = subtract(celsius(100), celsius(20));
 * valueIn(diff, kelvin);  // 80
 *
 * // Adding a linear difference to an absolute temperature
 * const heated = add(celsius(20), celsius.delta(10));
 * valueIn(heated, celsius);  // 30
 * ```
 *
 * @example Fluent chaining with q()
 * ```ts
 * import { kilometer, meter } from "@isentropic/dim-si/length";
 * import { hour } from "@isentropic/dim-si/time";
 * import { meterPerSecond } from "@isentropic/dim-si/velocity";
 * import { q } from "@isentropic/dim-si/ops";
 *
 * // Chain operations and extract with .in()
 * const speed = q(kilometer(100)).div(hour(2)).in(meterPerSecond);
 *
 * // Mix add/subtract in chains
 * const total = q(kilometer(5)).plus(meter(500)).in(meter);  // 5500
 * ```
 *
 * @example Scaling
 * ```ts
 * import { meter } from "@isentropic/dim-si/length";
 * import { scale, valueIn } from "@isentropic/dim-si/ops";
 *
 * const doubled = scale(meter(5), 2);
 * valueIn(doubled, meter);  // 10
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
