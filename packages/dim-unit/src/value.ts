import type { Affine, Linear } from "./types.ts";
import type { AffineUnit, LinearUnit } from "./system.ts";

/**
 * Extract the numeric value of a quantity in a given unit.
 *
 * For linear quantities and units, divides by the unit's scale factor.
 * For affine units, reverses the `base = value * scale + offset` conversion.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 * @param quantity - The quantity to convert
 * @param unit - The target unit
 * @returns The numeric value expressed in the target unit
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";
 *
 * const qs = defineQuantitySystem(["L"]);
 * const us = defineUnitSystem("example", qs);
 * const meter = us.unit(qs.base("L"));
 * const km = meter.scaled(1000);
 *
 * valueIn(km(5), meter);  // 5000
 * valueIn(km(5), km);     // 5
 * ```
 */
export function valueIn<D, S extends string>(
  quantity: Linear<D, S>,
  unit: LinearUnit<D, NoInfer<S>>,
): number;

/**
 * Extract the numeric value of an affine quantity in an affine unit.
 */
export function valueIn<D, S extends string>(
  quantity: Affine<D, S>,
  unit: AffineUnit<D, NoInfer<S>>,
): number;

/**
 * Extract the numeric value of an affine quantity in a linear unit (no offset applied).
 */
export function valueIn<D, S extends string>(
  quantity: Affine<D, S>,
  unit: LinearUnit<D, NoInfer<S>>,
): number;

/** Implementation */
export function valueIn<D, S extends string>(
  quantity: Linear<D, S> | Affine<D, S>,
  unit: LinearUnit<D, NoInfer<S>> | AffineUnit<D, NoInfer<S>>,
): number {
  if (typeof (unit as AffineUnit<D, S>).offset === "number") {
    // Affine unit: reverse the conversion (base = value * scale + offset)
    const affineUnit = unit as AffineUnit<D, S>;
    return (quantity.value - affineUnit.offset) / affineUnit.scale;
  } else {
    // Linear unit: just divide by scale
    return quantity.value / unit.scale;
  }
}
