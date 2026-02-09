import type { BaseDim, ScalarDim, WithDefaults } from "./dimensions.ts";
import type { Exp } from "./exponents.generated.ts";
import type { Quantity } from "./quantity.ts";

/** Factory function type for creating quantities. */
export type QuantityFactory<D> = (value: number) => Quantity<D>;

/** Extract the dimension type from a quantity factory. */
export type DimOf<F> = F extends QuantityFactory<infer D> ? D : never;

/** A quantity system for a set of base dimensions. */
export type QuantitySystem<Dims extends readonly string[]> = {
  dims: Dims;
  factory<const D extends Partial<{ [K in Dims[number]]: Exp }>>(
    dim: D,
  ): (value: number) => Quantity<WithDefaults<Dims, D>>;
  base<D extends Dims[number]>(
    dim: D,
  ): (value: number) => Quantity<BaseDim<Dims, D>>;
  scalar(value: number): Quantity<ScalarDim<Dims>>;
};

/** Define a quantity system with the given base dimensions. */
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
