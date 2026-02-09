/**
 * Chainable quantity operations.
 *
 * Wrap a quantity with {@linkcode q} to get a fluent API for arithmetic.
 * The chain tracks linear/affine state at the type level, enforcing
 * valid operations at compile time.
 *
 * @example
 * ```ts
 * import { q } from "@isentropic/dim-unit/chain";
 * import { valueIn } from "@isentropic/dim-unit";
 *
 * // Linear chaining
 * const speed = q(kilometer(100)).div(hour(2));
 * valueIn(speed, meterPerSecond); // works — QLinear satisfies Linear
 *
 * // Affine → linear transition
 * const delta = q(celsius(100)).minus(celsius(0)); // QLinear (affine - affine)
 *
 * // .in() terminal
 * const tempC = q(fahrenheit(212)).in(celsius); // 100
 * ```
 *
 * @module
 */

import type { Dim, DivDim, Exp, MulDim } from "@isentropic/dim-quantity";
import type { AffineUnit, LinearUnit } from "./system.ts";
import {
  add as uAdd,
  divide as uDivide,
  multiply as uMultiply,
  scale as uScale,
  subtract as uSubtract,
} from "./ops.ts";
import type { Affine, Linear } from "./types.ts";
import { valueIn } from "./value.ts";

/** Check if a quantity is affine. */
function isAffine<D, S extends string>(
  q: Linear<D, S> | Affine<D, S>,
): q is Affine<D, S> {
  return "_affine" in q && q._affine === true;
}

/**
 * Reinterpret a value+phantom-type object as a Linear quantity.
 *
 * QLinear/QAffine structurally satisfy Linear/Affine (same fields),
 * but TypeScript can't verify this across class boundaries with phantom
 * generics. This helper centralizes the single necessary cast.
 */
function asLinear<D extends Dim, S extends string>(
  obj: { readonly value: number },
): Linear<D, S> {
  return obj as Linear<D, S>;
}

/** Reinterpret a value+phantom-type object as an Affine quantity. */
function asAffine<D extends Dim, S extends string>(
  obj: { readonly value: number },
): Affine<D, S> {
  return obj as Affine<D, S>;
}

/**
 * Chainable wrapper for linear quantities.
 *
 * Supports all arithmetic operations. Structurally satisfies
 * {@linkcode Linear}, so it can be passed to free functions and
 * {@linkcode valueIn} without unwrapping.
 */
export class QLinear<D extends Dim, S extends string> {
  readonly value: number;
  readonly _dim?: D;
  readonly _affine?: false;
  readonly _system?: S;

  constructor(qty: Linear<D, S>) {
    this.value = qty.value;
  }

  /** Add an affine quantity (result becomes affine). */
  plus(other: Affine<D, NoInfer<S>>): QAffine<D, S>;
  /** Add a linear quantity. */
  plus(other: Linear<D, NoInfer<S>>): QLinear<D, S>;
  plus(
    other: Linear<D, NoInfer<S>> | Affine<D, NoInfer<S>>,
  ): QLinear<D, S> | QAffine<D, S> {
    const result = uAdd(asLinear<D, S>(this), asLinear<D, S>(other));
    if (isAffine(result)) {
      return new QAffine<D, S>(asAffine<D, S>(result));
    }
    return new QLinear<D, S>(asLinear<D, S>(result));
  }

  /** Subtract a linear quantity. */
  minus(other: Linear<D, NoInfer<S>>): QLinear<D, S> {
    return new QLinear<D, S>(
      uSubtract(asLinear<D, S>(this), other),
    );
  }

  /** Multiply by a linear quantity. */
  times<
    B extends Dim & Record<keyof D, Exp>,
  >(
    other: Linear<B, NoInfer<S>> & Linear<Record<keyof D, Exp>, NoInfer<S>>,
  ): QLinear<MulDim<D, B>, S> {
    return new QLinear(
      uMultiply(
        asLinear<D, S>(this) as Linear<D, S> & Linear<Record<keyof B, Exp>, S>,
        other,
      ),
    );
  }

  /** Divide by a linear quantity. */
  div<
    B extends Dim & Record<keyof D, Exp>,
  >(
    other: Linear<B, NoInfer<S>> & Linear<Record<keyof D, Exp>, NoInfer<S>>,
  ): QLinear<DivDim<D, B>, S> {
    return new QLinear(
      uDivide(
        asLinear<D, S>(this) as Linear<D, S> & Linear<Record<keyof B, Exp>, S>,
        other,
      ),
    );
  }

  /** Scale by a numeric factor. */
  scale(factor: number): QLinear<D, S> {
    return new QLinear<D, S>(
      uScale(asLinear<D, S>(this), factor),
    );
  }

  /** Extract the numeric value in the given unit. */
  in(unit: LinearUnit<D, NoInfer<S>>): number {
    return valueIn(asLinear<D, S>(this), unit);
  }
}

/**
 * Chainable wrapper for affine quantities.
 *
 * Supports only addition/subtraction with appropriate linear/affine
 * combinations. Structurally satisfies {@linkcode Affine}, so it can
 * be passed to free functions and {@linkcode valueIn} without unwrapping.
 */
export class QAffine<D extends Dim, S extends string> {
  readonly value: number;
  readonly _dim?: D;
  readonly _affine: true = true;
  readonly _system?: S;

  constructor(qty: Affine<D, S>) {
    this.value = qty.value;
  }

  /** Add a linear quantity (result stays affine). */
  plus(other: Linear<D, NoInfer<S>>): QAffine<D, S> {
    return new QAffine<D, S>(
      uAdd(asAffine<D, S>(this), other),
    );
  }

  /** Subtract an affine quantity (result becomes linear). */
  minus(other: Affine<D, NoInfer<S>>): QLinear<D, S>;
  /** Subtract a linear quantity (result stays affine). */
  minus(other: Linear<D, NoInfer<S>>): QAffine<D, S>;
  minus(
    other: Linear<D, NoInfer<S>> | Affine<D, NoInfer<S>>,
  ): QLinear<D, S> | QAffine<D, S> {
    if (isAffine(other)) {
      // Affine - Affine = Linear
      return new QLinear<D, S>(
        uSubtract(asAffine<D, S>(this), other),
      );
    }
    // Affine - Linear = Affine
    return new QAffine<D, S>(
      uSubtract(asAffine<D, S>(this), other),
    );
  }

  /** Extract the numeric value in the given affine unit. */
  in(unit: AffineUnit<D, NoInfer<S>>): number;
  /** Extract the numeric value in the given linear unit (no offset applied). */
  in(unit: LinearUnit<D, NoInfer<S>>): number;
  in(
    unit: LinearUnit<D, NoInfer<S>> | AffineUnit<D, NoInfer<S>>,
  ): number {
    return valueIn(
      asAffine<D, S>(this),
      unit as AffineUnit<D, S>,
    );
  }
}

/**
 * Wrap a quantity for fluent chaining.
 *
 * The returned wrapper tracks linear/affine state at the type level:
 * - {@linkcode QLinear} supports all operations (add, subtract, multiply, divide, scale)
 * - {@linkcode QAffine} supports only add/subtract with appropriate types
 * - Subtracting two affine values transitions back to {@linkcode QLinear}
 *
 * Both wrappers structurally satisfy their corresponding plain types,
 * so they interoperate with free functions and {@linkcode valueIn}.
 *
 * @example
 * ```ts
 * // Linear operations
 * const speed = q(kilometer(100)).div(hour(2));
 *
 * // Affine type-state transitions
 * const rate = q(celsius(100))    // QAffine
 *   .minus(celsius(20))           // QLinear (affine - affine)
 *   .div(minute(5));              // QLinear
 *
 * // Terminal: get a number
 * const v = q(kilometer(100)).div(hour(2)).in(meterPerSecond);
 * ```
 */
export function q<D extends Dim, S extends string>(
  qty: Affine<D, S>,
): QAffine<D, S>;
export function q<D extends Dim, S extends string>(
  qty: Linear<D, S>,
): QLinear<D, S>;
export function q<D extends Dim, S extends string>(
  qty: Linear<D, S> | Affine<D, S>,
): QLinear<D, S> | QAffine<D, S> {
  if (isAffine(qty)) {
    return new QAffine<D, S>(qty);
  }
  return new QLinear<D, S>(qty);
}
