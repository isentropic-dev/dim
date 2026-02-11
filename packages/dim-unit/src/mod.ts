/**
 * Build type-safe unit systems with scale factors and affine offsets.
 *
 * Layers units onto a quantity system from
 * {@link https://jsr.io/@isentropic/dim-quantity | @isentropic/dim-quantity}.
 * Units are callables that produce branded {@linkcode Linear} or
 * {@linkcode Affine} quantities, with the system name preventing
 * cross-system operations at compile time.
 *
 * For arithmetic, see
 * {@linkcode "@isentropic/dim-unit/ops" | free functions} or the
 * {@linkcode "@isentropic/dim-unit/chain" | fluent chain API}.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";
 *
 * const qs = defineQuantitySystem(["L", "Θ"]);
 * const us = defineUnitSystem("example", qs);
 *
 * const meter = us.unit(qs.base("L"));
 * const km = meter.scaled(1000);
 *
 * const kelvin = us.unit(qs.base("Θ"));
 * const celsius = kelvin.offset(273.15);
 *
 * valueIn(km(5), meter);         // 5000
 * valueIn(celsius(100), kelvin); // 373.15
 * ```
 *
 * @module
 */

export { defineUnitSystem } from "./system.ts";
export type {
  AffineUnit,
  BaseUnit,
  LinearUnit,
  ScaledUnit,
  UnitSystem,
} from "./system.ts";
export type { Affine, Linear } from "./types.ts";
export { valueIn } from "./value.ts";
