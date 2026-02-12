/**
 * Unit-aware arithmetic operations (free functions).
 *
 * Extends quantity operations with support for affine units (like temperature
 * scales). For a fluent chaining API, see `@isentropic/dim-unit/chain`.
 *
 * @module
 */

import type { Dim, DivDim, Exp, MulDim } from "@isentropic/dim-quantity";
import {
  add as qAdd,
  divide as qDivide,
  multiply as qMultiply,
  scale as qScale,
  subtract as qSubtract,
} from "@isentropic/dim-quantity/ops";
import type { Affine, Linear } from "./types.ts";

/** Check if a quantity is affine. */
function isAffine<D, S extends string>(
  q: Linear<D, S> | Affine<D, S>,
): q is Affine<D, S> {
  return "_affine" in q && q._affine === true;
}

// === Add ===

/**
 * Add two quantities.
 *
 * Supports linear + linear, linear + affine, and affine + linear.
 * Adding two affine quantities throws at runtime.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 * @param a - The left operand
 * @param b - The right operand
 * @returns The sum — affine if either operand is affine, linear otherwise
 *
 * @example Linear and affine addition
 * ```ts
 * const total = add(km(5), meter(500));     // linear + linear = linear
 * const warm = add(celsius(20), kelvin(5)); // affine + linear = affine
 * ```
 */
export function add<D extends Dim, S extends string>(
  a: Affine<D, S>,
  b: Linear<D, NoInfer<S>>,
): Affine<D, S>;
/** Add an affine quantity to a linear quantity. */
export function add<D extends Dim, S extends string>(
  a: Linear<D, S>,
  b: Affine<D, NoInfer<S>>,
): Affine<D, S>;
/** Add two linear quantities. */
export function add<D extends Dim, S extends string>(
  a: Linear<D, S>,
  b: Linear<D, NoInfer<S>>,
): Linear<D, S>;
/** Implementation */
export function add<D extends Dim, S extends string>(
  a: Linear<D, S> | Affine<D, S>,
  b: Linear<D, NoInfer<S>> | Affine<D, NoInfer<S>>,
): Linear<D, S> | Affine<D, S> {
  const aIsAffine = isAffine(a);
  const bIsAffine = isAffine(b);

  if (aIsAffine && bIsAffine) {
    throw new Error("Cannot add two affine quantities");
  }

  const result = qAdd(a, b);

  if (aIsAffine || bIsAffine) {
    return { ...result, _affine: true as const } as Affine<D, S>;
  }
  return result as Linear<D, S>;
}

// === Subtract ===

/**
 * Subtract two quantities.
 *
 * Supports affine - affine, affine - linear, and linear - linear.
 * Subtracting affine from linear throws at runtime.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 * @param a - The left operand
 * @param b - The right operand
 * @returns The difference — affine - affine yields linear, affine - linear
 *   stays affine, linear - linear stays linear
 *
 * @example Affine and linear subtraction
 * ```ts
 * const delta = subtract(celsius(100), celsius(0));  // affine - affine = linear
 * const cooled = subtract(celsius(100), kelvin(10)); // affine - linear = affine
 * ```
 */
export function subtract<D extends Dim, S extends string>(
  a: Affine<D, S>,
  b: Affine<D, NoInfer<S>>,
): Linear<D, S>;
/** Subtract a linear quantity from an affine quantity. */
export function subtract<D extends Dim, S extends string>(
  a: Affine<D, S>,
  b: Linear<D, NoInfer<S>>,
): Affine<D, S>;
/** Subtract two linear quantities. */
export function subtract<D extends Dim, S extends string>(
  a: Linear<D, S>,
  b: Linear<D, NoInfer<S>>,
): Linear<D, S>;
/** Implementation */
export function subtract<D extends Dim, S extends string>(
  a: Linear<D, S> | Affine<D, S>,
  b: Linear<D, NoInfer<S>> | Affine<D, NoInfer<S>>,
): Linear<D, S> | Affine<D, S> {
  const aIsAffine = isAffine(a);
  const bIsAffine = isAffine(b);

  const result = qSubtract(a, b);

  // Affine - Affine = Linear
  if (aIsAffine && bIsAffine) {
    return result as Linear<D, S>;
  }

  // Affine - Linear = Affine
  if (aIsAffine) {
    return { ...result, _affine: true as const } as Affine<D, S>;
  }

  // Linear - Affine is not allowed (doesn't make physical sense)
  if (bIsAffine) {
    throw new Error("Cannot subtract affine from linear");
  }

  // Linear - Linear = Linear
  return result as Linear<D, S>;
}

// === Multiply ===

/**
 * Multiply two linear quantities. Dimensions add.
 *
 * Both operands must be from the same unit system. Affine quantities
 * cannot be multiplied.
 *
 * @typeParam A - The dimension type of the left operand
 * @typeParam B - The dimension type of the right operand
 * @typeParam S - The unit system brand
 * @param a - The left operand
 * @param b - The right operand
 * @returns A linear quantity with the product of dimensions
 *
 * @example Computing area from two lengths
 * ```ts
 * const area = multiply(meter(3), meter(4)); // 12 m²
 * ```
 */
export function multiply<
  A extends Dim,
  B extends Dim & Record<keyof A, Exp>,
  S extends string,
>(
  a: Linear<A, S> & Linear<Record<keyof B, Exp>, S>,
  b: Linear<B, NoInfer<S>>,
): Linear<MulDim<A, B>, S> {
  return qMultiply(a, b) as Linear<MulDim<A, B>, S>;
}

// === Divide ===

/**
 * Divide two linear quantities. Dimensions subtract.
 *
 * Both operands must be from the same unit system. Affine quantities
 * cannot be divided.
 *
 * @typeParam A - The dimension type of the left operand
 * @typeParam B - The dimension type of the right operand
 * @typeParam S - The unit system brand
 * @param a - The left operand
 * @param b - The right operand
 * @returns A linear quantity with the quotient of dimensions
 *
 * @example Computing speed from distance and time
 * ```ts
 * const speed = divide(meter(100), second(10)); // 10 m/s
 * ```
 */
export function divide<
  A extends Dim,
  B extends Dim & Record<keyof A, Exp>,
  S extends string,
>(
  a: Linear<A, S> & Linear<Record<keyof B, Exp>, S>,
  b: Linear<B, NoInfer<S>>,
): Linear<DivDim<A, B>, S> {
  return qDivide(a, b) as Linear<DivDim<A, B>, S>;
}

// === Scale ===

/**
 * Scale a linear quantity by a numeric factor.
 *
 * @typeParam D - The dimension type
 * @typeParam S - The unit system brand
 * @param q - The quantity to scale
 * @param factor - The numeric multiplier
 * @returns A linear quantity with the scaled value
 *
 * @example Doubling a quantity
 * ```ts
 * const doubled = scale(meter(5), 2); // 10 m
 * ```
 */
export function scale<D extends Dim, S extends string>(
  q: Linear<D, S>,
  factor: number,
): Linear<D, S> {
  return qScale(q, factor) as Linear<D, S>;
}
