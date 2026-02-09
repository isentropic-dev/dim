/**
 * Unit-aware arithmetic operations.
 *
 * Extends quantity operations with support for affine units (like temperature scales).
 *
 * @example
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { defineUnitSystem } from "@isentropic/dim-unit";
 * import { add, divide, subtract } from "@isentropic/dim-unit/ops";
 *
 * const qs = defineQuantitySystem(["L", "Θ"]);
 * const us = defineUnitSystem("example", qs);
 *
 * const meter = us.unit(qs.base("L"));
 * const km = meter.scaled(1000);
 * const total = add(km(5), meter(500)); // 5500 m
 * ```
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

/** Add a linear quantity to an affine quantity. */
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

/** Subtract two affine quantities (returns linear delta). */
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

/** Multiply two linear quantities. Dimensions add. Both must be from the same system. */
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

/** Divide two linear quantities. Dimensions subtract. Both must be from the same system. */
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

/** Scale a linear quantity by a factor. */
export function scale<D extends Dim, S extends string>(
  q: Linear<D, S>,
  factor: number,
): Linear<D, S> {
  return qScale(q, factor) as Linear<D, S>;
}
