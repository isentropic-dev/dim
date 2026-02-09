/**
 * Quantity arithmetic operations.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { add, divide, multiply, scale, subtract } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 * const time = sys.base("T");
 *
 * const velocity = divide(length(100), time(10));
 * const doubled = scale(length(5), 2);
 * ```
 *
 * @module
 */

import type { Exp } from "./exponents.generated.ts";
import type { Dim, DivDim, MulDim } from "./dimensions.ts";
import type { Quantity } from "./quantity.ts";

/** Multiply two quantities. Dimensions add. Both must be from the same system. */
export function multiply<
  A extends Dim,
  B extends Dim & Record<keyof A, Exp>,
>(
  a: Quantity<A> & Quantity<Record<keyof B, Exp>>,
  b: Quantity<B>,
): Quantity<MulDim<A, B>> {
  return { value: a.value * b.value };
}

/** Divide two quantities. Dimensions subtract. Both must be from the same system. */
export function divide<
  A extends Dim,
  B extends Dim & Record<keyof A, Exp>,
>(
  a: Quantity<A> & Quantity<Record<keyof B, Exp>>,
  b: Quantity<B>,
): Quantity<DivDim<A, B>> {
  return { value: a.value / b.value };
}

/** Add two quantities. Dimensions must match. */
export function add<D extends Dim>(
  a: Quantity<D>,
  b: Quantity<D>,
): Quantity<D> {
  return { value: a.value + b.value };
}

/** Subtract two quantities. Dimensions must match. */
export function subtract<D extends Dim>(
  a: Quantity<D>,
  b: Quantity<D>,
): Quantity<D> {
  return { value: a.value - b.value };
}

/** Scale a quantity by a plain number. */
export function scale<D extends Dim>(
  q: Quantity<D>,
  factor: number,
): Quantity<D> {
  return { value: q.value * factor };
}
