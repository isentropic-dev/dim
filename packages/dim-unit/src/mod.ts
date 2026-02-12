/**
 * Build type-safe unit systems with scale factors and affine offsets.
 *
 * Layers units onto a quantity system from `@isentropic/dim-quantity`. Units
 * are callables that produce branded {@linkcode Linear} or {@linkcode Affine}
 * quantities, with the system name preventing cross-system operations at
 * compile time.
 *
 * - {@linkcode defineUnitSystem} — create a unit system from a quantity system,
 *   providing a `unit` method that produces {@linkcode BaseUnit | base},
 *   {@linkcode ScaledUnit | scaled}, and {@linkcode AffineUnit | affine} units
 * - {@linkcode valueIn} — extract a quantity's numeric value in a target unit
 *
 * Arithmetic operations (`add`, `subtract`, `multiply`, `divide`, `scale`)
 * are in `@isentropic/dim-unit/ops`. A fluent chaining API is in
 * `@isentropic/dim-unit/chain`.
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
