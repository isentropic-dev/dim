import type { DimOf, Quantity } from "@isentropic/dim-quantity";
import type { Affine, Linear } from "./types.ts";

/** A quantity factory from the quantity package. */
type QuantityFactory<D> = (value: number) => Quantity<D>;

/** A linear unit: callable, produces Linear quantities. */
export type LinearUnit<D, S extends string> = {
  (value: number): Linear<D, S>;
  readonly scale: number;
};

/**
 * A scaled unit: linear unit that can derive further scaled/offset units.
 * This is the intermediate result of baseUnit.scaled().
 */
export type ScaledUnit<D, S extends string> = LinearUnit<D, S> & {
  scaled(factor: number): ScaledUnit<D, S>;
  offset(value: number): AffineUnit<D, S>;
};

/** A base unit: linear unit that can derive other units. */
export type BaseUnit<D, S extends string> = LinearUnit<D, S> & {
  scaled(factor: number): ScaledUnit<D, S>;
  offset(value: number): AffineUnit<D, S>;
};

/** An affine unit: produces Affine quantities, has a delta unit. */
export type AffineUnit<D, S extends string> = {
  (value: number): Affine<D, S>;
  readonly scale: number;
  readonly offset: number;
  readonly delta: LinearUnit<D, S>;
};

/** Create a linear unit with the given scale. */
function createLinearUnit<D, S extends string>(
  quantityFactory: QuantityFactory<D>,
  scale: number,
): LinearUnit<D, S> {
  const unit = ((value: number): Linear<D, S> => {
    return quantityFactory(value * scale) as Linear<D, S>;
  }) as LinearUnit<D, S>;

  Object.defineProperty(unit, "scale", { value: scale, enumerable: true });

  return unit;
}

/** Create a scaled unit (linear unit that can derive further scaled/offset units). */
function createScaledUnit<D, S extends string>(
  quantityFactory: QuantityFactory<D>,
  scale: number,
): ScaledUnit<D, S> {
  const unit = ((value: number): Linear<D, S> => {
    return quantityFactory(value * scale) as Linear<D, S>;
  }) as ScaledUnit<D, S>;

  Object.defineProperty(unit, "scale", { value: scale, enumerable: true });

  unit.scaled = (factor: number): ScaledUnit<D, S> => {
    return createScaledUnit(quantityFactory, scale * factor);
  };

  unit.offset = (offsetValue: number): AffineUnit<D, S> => {
    return createAffineUnit(quantityFactory, scale, offsetValue);
  };

  return unit;
}

/** Create a base unit that can derive scaled/offset units. */
function createBaseUnit<D, S extends string>(
  quantityFactory: QuantityFactory<D>,
): BaseUnit<D, S> {
  const unit = ((value: number): Linear<D, S> => {
    return quantityFactory(value) as Linear<D, S>;
  }) as BaseUnit<D, S>;

  Object.defineProperty(unit, "scale", { value: 1, enumerable: true });

  unit.scaled = (factor: number): ScaledUnit<D, S> => {
    return createScaledUnit(quantityFactory, factor);
  };

  unit.offset = (offsetValue: number): AffineUnit<D, S> => {
    return createAffineUnit(quantityFactory, 1, offsetValue);
  };

  return unit;
}

/** Create an affine unit with the given scale and offset. */
function createAffineUnit<D, S extends string>(
  quantityFactory: QuantityFactory<D>,
  scale: number,
  offset: number,
): AffineUnit<D, S> {
  const unit = ((value: number): Affine<D, S> => {
    const baseValue = value * scale + offset;
    const q = quantityFactory(baseValue);
    return { ...q, _affine: true as const } as Affine<D, S>;
  }) as AffineUnit<D, S>;

  Object.defineProperty(unit, "scale", { value: scale, enumerable: true });
  Object.defineProperty(unit, "offset", { value: offset, enumerable: true });

  // Delta unit uses same scale but no offset
  Object.defineProperty(unit, "delta", {
    value: createLinearUnit<D, S>(quantityFactory, scale),
    enumerable: true,
  });

  return unit;
}

/** A unit system layered on a quantity system. */
export type UnitSystem<Dims extends readonly string[], Name extends string> = {
  readonly name: Name;
  readonly quantitySystem: { dims: Dims; [key: string]: unknown };
  unit<F extends QuantityFactory<unknown>>(
    quantityFactory: F,
  ): BaseUnit<DimOf<F>, Name>;
};

/**
 * Define a unit system that layers units onto a quantity system.
 *
 * @param name - Unique name for this unit system (used as type brand to prevent cross-system operations)
 * @param qs - The underlying quantity system
 */
export function defineUnitSystem<
  const Name extends string,
  const Dims extends readonly string[],
>(
  name: Name,
  qs: { dims: Dims; [key: string]: unknown },
): UnitSystem<Dims, Name> {
  return {
    /** The unique name of this unit system. */
    name,

    /** The underlying quantity system. */
    quantitySystem: qs,

    /** Create a base unit from a quantity factory. */
    unit<F extends QuantityFactory<unknown>>(
      quantityFactory: F,
    ): BaseUnit<DimOf<F>, Name> {
      return createBaseUnit<DimOf<F>, Name>(
        quantityFactory as QuantityFactory<DimOf<F>>,
      );
    },
  };
}
