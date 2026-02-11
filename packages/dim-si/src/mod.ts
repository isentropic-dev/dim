/**
 * Ready-to-use SI units with compile-time dimensional analysis.
 *
 * Import units from per-quantity modules (e.g., `@isentropic/dim-si/length`,
 * `@isentropic/dim-si/energy`) and operations from `@isentropic/dim-si/ops`.
 *
 * The `si` unit system instance is available for creating custom units beyond
 * those pre-defined in this package.
 *
 * @example Unit conversion
 * ```ts
 * import { kilometer, meter } from "@isentropic/dim-si/length";
 * import { hour } from "@isentropic/dim-si/time";
 * import { meterPerSecond } from "@isentropic/dim-si/velocity";
 * import { divide, valueIn } from "@isentropic/dim-si/ops";
 *
 * const speed = divide(kilometer(36), hour(1));
 * valueIn(speed, meterPerSecond);  // 10
 * ```
 *
 * @example Fluent chaining
 * ```ts
 * import { kilometer, meter } from "@isentropic/dim-si/length";
 * import { hour } from "@isentropic/dim-si/time";
 * import { meterPerSecond } from "@isentropic/dim-si/velocity";
 * import { q } from "@isentropic/dim-si/ops";
 *
 * const speed = q(kilometer(36)).div(hour(1)).in(meterPerSecond);  // 10
 * const total = q(kilometer(5)).plus(meter(500)).in(meter);  // 5500
 * ```
 *
 * @example Temperature (affine units)
 * ```ts
 * import { celsius, fahrenheit, kelvin } from "@isentropic/dim-si/temperature";
 * import { add, subtract, valueIn } from "@isentropic/dim-si/ops";
 *
 * valueIn(celsius(100), fahrenheit);  // 212
 * valueIn(celsius(100), kelvin);      // 373.15
 *
 * // Subtracting two absolute temperatures gives a difference
 * const diff = subtract(celsius(100), celsius(20));
 * valueIn(diff, kelvin);  // 80
 *
 * // Adding a difference to an absolute temperature
 * const heated = add(celsius(20), celsius.delta(10));
 * valueIn(heated, celsius);  // 30
 * ```
 *
 * @example Creating custom units
 * ```ts
 * import { si } from "@isentropic/dim-si";
 * import { length } from "@isentropic/dim-isq";
 *
 * const foot = si.unit(length).scaled(0.3048);
 * ```
 *
 * @module
 */

export { type Si, si } from "./system.ts";
