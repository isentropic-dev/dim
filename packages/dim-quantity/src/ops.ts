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

/**
 * Multiply two quantities. Dimensions add.
 *
 * Both quantities must belong to the same system.
 *
 * @param a The left operand.
 * @param b The right operand.
 * @returns A quantity whose dimension is {@linkcode MulDim}`<A, B>`.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { multiply } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 * const time = sys.base("T");
 *
 * const area = multiply(length(3), length(4));   // Quantity<{ L: 2, T: 0 }>
 * const velocity = multiply(length(10), sys.factory({ T: -1 })(2));
 * ```
 */
export function multiply<
  A extends Dim,
  B extends Dim & Record<keyof A, Exp>,
>(
  a: Quantity<A> & Quantity<Record<keyof B, Exp>>,
  b: Quantity<B>,
): Quantity<MulDim<A, B>> {
  return { value: a.value * b.value };
}

/**
 * Divide two quantities. Dimensions subtract.
 *
 * Both quantities must belong to the same system.
 *
 * @param a The numerator.
 * @param b The denominator.
 * @returns A quantity whose dimension is {@linkcode DivDim}`<A, B>`.
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
 * const velocity = divide(length(100), time(10)); // Quantity<{ L: 1, T: -1 }>
 * ```
 */
export function divide<
  A extends Dim,
  B extends Dim & Record<keyof A, Exp>,
>(
  a: Quantity<A> & Quantity<Record<keyof B, Exp>>,
  b: Quantity<B>,
): Quantity<DivDim<A, B>> {
  return { value: a.value / b.value };
}

/**
 * Add two quantities with matching dimensions.
 *
 * @param a The first operand.
 * @param b The second operand.
 * @returns A quantity with the same dimension and the sum of the values.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { add } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 *
 * const total = add(length(3), length(7)); // Quantity<{ L: 1, T: 0 }>, value 10
 * ```
 */
export function add<D extends Dim>(
  a: Quantity<D>,
  b: Quantity<D>,
): Quantity<D> {
  return { value: a.value + b.value };
}

/**
 * Subtract two quantities with matching dimensions.
 *
 * @param a The quantity to subtract from.
 * @param b The quantity to subtract.
 * @returns A quantity with the same dimension and the difference of the values.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { subtract } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 *
 * const diff = subtract(length(10), length(3)); // Quantity<{ L: 1, T: 0 }>, value 7
 * ```
 */
export function subtract<D extends Dim>(
  a: Quantity<D>,
  b: Quantity<D>,
): Quantity<D> {
  return { value: a.value - b.value };
}

/**
 * Scale a quantity by a plain number.
 *
 * @param q The quantity to scale.
 * @param factor The scalar multiplier.
 * @returns A quantity with the same dimension and the scaled value.
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { scale } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 *
 * const doubled = scale(length(5), 2); // Quantity<{ L: 1, T: 0 }>, value 10
 * ```
 */
export function scale<D extends Dim>(
  q: Quantity<D>,
  factor: number,
): Quantity<D> {
  return { value: q.value * factor };
}
