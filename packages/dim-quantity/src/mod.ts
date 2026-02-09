/**
 * Type-safe quantity systems with dimension tracking.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { divide } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 * const time = sys.base("T");
 *
 * const velocity = divide(length(100), time(10)); // L: 1, T: -1
 * ```
 *
 * @module
 */
export type { Quantity } from "./quantity.ts";
export { defineQuantitySystem } from "./system.ts";
export type { DimOf, QuantityFactory, QuantitySystem } from "./system.ts";
export type { Dim, DivDim, MulDim, WithDefaults } from "./dimensions.ts";
export type { Exp } from "./exponents.generated.ts";
