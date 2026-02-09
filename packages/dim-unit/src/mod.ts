/**
 * Type-safe unit systems layered on quantity systems.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";
 * import { add, subtract } from "@isentropic/dim-unit/ops";
 *
 * const qs = defineQuantitySystem(["L", "Θ"]);
 * const length = qs.factory({ L: 1, Θ: 0 });
 * const temperature = qs.factory({ L: 0, Θ: 1 });
 *
 * const us = defineUnitSystem("myUnits", qs);
 *
 * // Linear units
 * const meter = us.unit(length);
 * const kilometer = meter.scaled(1000);
 * const d = add(kilometer(5), kilometer(3)); // 8km
 *
 * // Affine units
 * const kelvin = us.unit(temperature);
 * const celsius = kelvin.offset(273.15);
 * const diff = subtract(celsius(100), celsius(0)); // 100K delta
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
