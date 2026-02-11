/**
 * A numeric value tagged with a phantom dimension type.
 *
 * The `value` field holds the runtime number. The type parameter `D` encodes
 * the dimensional signature at compile time — it has no runtime cost.
 *
 * Quantities are created via {@linkcode QuantitySystem.base},
 * {@linkcode QuantitySystem.factory}, or {@linkcode QuantitySystem.scalar},
 * and combined with operations from `@isentropic/dim-quantity/ops`.
 *
 * @typeParam D The dimension signature (e.g., `{ L: 1, M: 0, T: -2 }` for
 * acceleration in an L/M/T system).
 *
 * @example
 * ```ts
 * import type { Quantity } from "@isentropic/dim-quantity";
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 *
 * const d: Quantity<{ L: 1, T: 0 }> = length(42);
 * console.log(d.value); // 42
 * ```
 */
export type Quantity<D> = {
  readonly value: number;
  /** @internal Phantom field for compile-time dimension tracking. */
  readonly _dim?: D;
};
