/**
 * Define quantity systems for compile-time dimensional analysis.
 *
 * A quantity encodes dimensionality — dimensions are tracked at compile time
 * so the type checker catches errors like adding a length to a time before
 * your code runs. This package provides the core building blocks:
 *
 * - {@linkcode defineQuantitySystem} — create a quantity system from a tuple
 *   of dimension symbols, with methods for base, derived, and scalar
 *   quantity factories
 * - {@linkcode Quantity} — a numeric value branded with a phantom dimension type
 * - Dimension algebra types ({@linkcode MulDim}, {@linkcode DivDim},
 *   {@linkcode WithDefaults}) for computing result dimensions at the type level
 *
 * Arithmetic operations (`multiply`, `divide`, `add`, `subtract`, `scale`)
 * are in `@isentropic/dim-quantity/ops`. Code generation for larger systems
 * is in `@isentropic/dim-quantity/generate`.
 *
 * @module
 */

export type { Quantity } from "./quantity.ts";
export { defineQuantitySystem } from "./system.ts";
export type { DimOf, QuantityFactory, QuantitySystem } from "./system.ts";
export type { Dim, DivDim, MulDim, WithDefaults } from "./dimensions.ts";
export type { Exp } from "./exponents.generated.ts";
