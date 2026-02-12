import type { BaseDim, ScalarDim, WithDefaults } from "./dimensions.ts";
import type { Exp } from "./exponents.generated.ts";
import type { Quantity } from "./quantity.ts";

/**
 * A function that creates a {@linkcode Quantity} with a fixed dimension type.
 *
 * Returned by {@linkcode QuantitySystem.base} and
 * {@linkcode QuantitySystem.factory}. Call it with a numeric value to produce
 * a dimensionally typed quantity.
 *
 * @typeParam D The dimension signature of quantities this factory produces.
 *
 * @example Typing a factory explicitly
 * ```ts
 * import { defineQuantitySystem, type QuantityFactory } from "@isentropic/dim-quantity";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length: QuantityFactory<{ L: 1, T: 0 }> = sys.base("L");
 *
 * const d = length(42); // Quantity<{ L: 1, T: 0 }> with value 42
 * ```
 */
export type QuantityFactory<D> = (value: number) => Quantity<D>;

/**
 * Extract the dimension type from a {@linkcode QuantityFactory}.
 *
 * Useful for deriving dimension types from existing factories without
 * spelling out the full dimension signature.
 *
 * @typeParam F A {@linkcode QuantityFactory} to extract the dimension from.
 *
 * @example Extracting a dimension type from a factory
 * ```ts
 * import { defineQuantitySystem, type DimOf } from "@isentropic/dim-quantity";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 *
 * type Length = DimOf<typeof length>; // { L: 1, T: 0 }
 * ```
 */
export type DimOf<F> = F extends QuantityFactory<infer D> ? D : never;

/**
 * A quantity system for a set of base dimensions.
 *
 * Created by {@linkcode defineQuantitySystem}. Provides methods to create
 * typed quantity factories for base, derived, and dimensionless quantities.
 *
 * @typeParam Dims The tuple of base dimension symbols (e.g., `["L", "M", "T"]`).
 */
export type QuantitySystem<Dims extends readonly string[]> = {
  /** The base dimension symbols this system was created with. */
  dims: Dims;

  /**
   * Create a factory for quantities with the given dimension signature.
   *
   * Unspecified dimensions default to exponent 0.
   *
   * @example Creating derived quantity factories
   * ```ts
   * import { defineQuantitySystem } from "@isentropic/dim-quantity";
   *
   * const sys = defineQuantitySystem(["L", "M", "T"]);
   * const area = sys.factory({ L: 2 });     // Quantity<{ L: 2, M: 0, T: 0 }>
   * const force = sys.factory({ L: 1, M: 1, T: -2 });
   * ```
   */
  factory<const D extends Partial<{ [K in Dims[number]]: Exp }>>(
    dim: D,
  ): (value: number) => Quantity<WithDefaults<Dims, D>>;

  /**
   * Create a factory for a base dimension (exponent 1, all others 0).
   *
   * @example Creating a base quantity factory
   * ```ts
   * import { defineQuantitySystem } from "@isentropic/dim-quantity";
   *
   * const sys = defineQuantitySystem(["L", "M", "T"]);
   * const length = sys.base("L"); // Quantity<{ L: 1, M: 0, T: 0 }>
   * ```
   */
  base<D extends Dims[number]>(
    dim: D,
  ): (value: number) => Quantity<BaseDim<Dims, D>>;

  /**
   * Create a dimensionless (scalar) quantity.
   *
   * @example Creating a dimensionless quantity
   * ```ts
   * import { defineQuantitySystem } from "@isentropic/dim-quantity";
   *
   * const sys = defineQuantitySystem(["L", "M", "T"]);
   * const ratio = sys.scalar(2.5); // Quantity<{ L: 0, M: 0, T: 0 }>
   * ```
   */
  scalar(value: number): Quantity<ScalarDim<Dims>>;
};

/**
 * Define a quantity system with the given base dimensions.
 *
 * A quantity system provides type-safe factories for creating quantities whose
 * dimensions are tracked at compile time. Each base dimension becomes a key in
 * the dimension signature, with exponents representing the dimensional formula.
 *
 * @param dims Base dimension symbols for the system (e.g., `["L", "M", "T"]`
 * for length, mass, and time).
 * @returns A {@linkcode QuantitySystem} with methods to create quantity factories.
 *
 * @example Create a system and use base/derived factories
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { divide } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "M", "T"]);
 *
 * // Base quantity factories (one dimension with exponent 1)
 * const length = sys.base("L");
 * const time = sys.base("T");
 *
 * // Derived quantity factory with explicit dimension signature
 * const velocity = sys.factory({ L: 1, T: -1 });
 *
 * // Or derive via arithmetic — the type is inferred
 * const v = divide(length(100), time(10)); // Quantity<{ L: 1, M: 0, T: -1 }>
 *
 * // Dimensionless scalar
 * const ratio = sys.scalar(3.14);
 * ```
 */
export function defineQuantitySystem<const Dims extends readonly string[]>(
  dims: Dims,
): QuantitySystem<Dims> {
  return {
    dims,

    /** Create a factory for quantities with the given dimension signature. */
    factory<const D extends Partial<{ [K in Dims[number]]: Exp }>>(
      _dim: D,
    ): (value: number) => Quantity<WithDefaults<Dims, D>> {
      return (value) => ({ value });
    },

    /** Create a factory for a base dimension (exponent 1, all others 0). */
    base<D extends Dims[number]>(
      _dim: D,
    ): (value: number) => Quantity<BaseDim<Dims, D>> {
      return (value) => ({ value });
    },

    /** Create a dimensionless (scalar) quantity. */
    scalar(value: number): Quantity<ScalarDim<Dims>> {
      return { value };
    },
  };
}
