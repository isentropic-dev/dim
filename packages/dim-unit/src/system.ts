import type { DimOf, Quantity } from "@isentropic/dim-quantity";
import type { Affine, Linear } from "./types.ts";

/** A quantity factory from the quantity package. */
type QuantityFactory<D> = (value: number) => Quantity<D>;

/**
 * A linear unit: a callable that produces {@linkcode Linear} quantities.
 *
 * Call with a numeric value to create a quantity in this unit's scale.
 * The `scale` property gives the factor relative to the base unit.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 */
export type LinearUnit<D, S extends string> = {
  (value: number): Linear<D, S>;
  readonly scale: number;
};

/**
 * A scaled unit: a {@linkcode LinearUnit} that can derive further units.
 *
 * Created by calling {@linkcode BaseUnit.scaled | scaled} on a base unit.
 * Supports chaining to create additional scaled or affine units.
 *
 * Exported for use in explicit type annotations (required by JSR's
 * no-slow-types policy). Most code won't reference this type directly.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 *
 * @example Deriving scaled and affine units
 * ```ts
 * const km = meter.scaled(1000);
 * const mm = meter.scaled(0.001);
 * const celsius = kelvin.scaled(1).offset(273.15);
 * ```
 */
export type ScaledUnit<D, S extends string> = LinearUnit<D, S> & {
  scaled(factor: number): ScaledUnit<D, S>;
  offset(value: number): AffineUnit<D, S>;
};

/**
 * A base unit: the reference unit for a dimension in a unit system.
 *
 * Created by {@linkcode UnitSystem.unit | unit} from a quantity factory.
 * Has scale 1 and serves as the root for deriving scaled and affine units.
 *
 * Exported for use in explicit type annotations (required by JSR's
 * no-slow-types policy). Most code won't reference this type directly.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 *
 * @example Creating a base unit and scaling it
 * ```ts
 * const meter = us.unit(length);
 * const km = meter.scaled(1000);
 * ```
 */
export type BaseUnit<D, S extends string> = LinearUnit<D, S> & {
  scaled(factor: number): ScaledUnit<D, S>;
  offset(value: number): AffineUnit<D, S>;
};

/**
 * An affine unit: a callable that produces {@linkcode Affine} quantities.
 *
 * Created by calling {@linkcode BaseUnit.offset | offset} or
 * {@linkcode ScaledUnit.offset | offset} on a linear unit. Converts values
 * using `base = value * scale + offset`. The {@linkcode AffineUnit.delta | delta}
 * property provides the corresponding linear unit for differences.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 *
 * @example Affine unit with offset and delta
 * ```ts
 * const celsius = kelvin.offset(273.15);
 * celsius(100);        // Affine quantity (373.15 K internally)
 * celsius.delta(10);   // Linear quantity (10 K difference)
 * ```
 */
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

/**
 * A unit system layered on a quantity system.
 *
 * Provides a {@linkcode UnitSystem.unit | unit} method to create base units
 * from quantity factories. The system's name brands all quantities to prevent
 * cross-system operations at compile time.
 *
 * Exported for use in explicit type annotations (required by JSR's
 * no-slow-types policy). Most code won't reference this type directly.
 *
 * @typeParam Dims - The dimension names from the underlying quantity system
 * @typeParam Name - The unique system name used as a type-level brand
 */
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
 * The system name brands every quantity produced by its units, ensuring
 * the type checker rejects operations between different unit systems.
 *
 * @typeParam Name - The unique system name used as a type-level brand
 * @typeParam Dims - The dimension names from the underlying quantity system
 * @param name - Unique name for this unit system
 * @param qs - The underlying quantity system
 * @returns A {@linkcode UnitSystem} for creating base units
 *
 * @example Defining a unit system
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { defineUnitSystem } from "@isentropic/dim-unit";
 *
 * const qs = defineQuantitySystem(["L", "T"]);
 * const us = defineUnitSystem("mechanics", qs);
 *
 * const meter = us.unit(qs.base("L"));
 * const km = meter.scaled(1000);
 * ```
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
