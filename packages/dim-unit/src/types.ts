import type { Quantity } from "@isentropic/dim-quantity";

/**
 * A linear quantity (vector-like).
 * Supports all operations: add, subtract, multiply, divide, scale.
 * Used for non-affine units and affine deltas.
 *
 * @typeParam D - The dimension type
 * @typeParam System - Brand identifying the unit system (prevents cross-system operations)
 */
export type Linear<D, System extends string = string> = Quantity<D> & {
  readonly _affine?: false;
  readonly _system?: System;
};

/**
 * An affine quantity (point-like).
 * Only supports: subtract(Affine, Affine) → Linear, and ± Linear → Affine.
 * Used for affine units (those with non-zero offset, like temperature).
 *
 * @typeParam D - The dimension type
 * @typeParam System - Brand identifying the unit system (prevents cross-system operations)
 */
export type Affine<D, System extends string = string> = Quantity<D> & {
  readonly _affine: true;
  readonly _system?: System;
};
