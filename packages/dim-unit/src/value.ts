import type { Affine, Linear } from "./types.ts";
import type { AffineUnit, LinearUnit } from "./system.ts";

/**
 * Extract the numeric value of a linear quantity in the given unit.
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
