import type { AddExp, Exp, SubExp } from "./exponents.generated.ts";

/**
 * A dimension signature: a mapping from dimension symbols to their
 * {@linkcode Exp exponents}.
 *
 * This is the general constraint used in generic bounds for quantity
 * operations. Concrete dimension types produced by a
 * {@linkcode QuantitySystem} are more specific — `Dim` serves as the
 * base type they all satisfy.
 */
export type Dim = Record<string, Exp>;

/** Flatten a mapped type for cleaner IDE display. */
// deno-lint-ignore ban-types
export type Simplify<T> = { -readonly [K in keyof T]: T[K] } & {};

/** A dimensionless dimension: all exponents are zero. */
export type ScalarDim<Dims extends readonly string[]> = Simplify<
  { [K in Dims[number]]: 0 }
>;

/** A base dimension: one exponent is 1, rest are zero. */
export type BaseDim<Dims extends readonly string[], D extends Dims[number]> =
  Simplify<{ [K in Dims[number]]: K extends D ? 1 : 0 }>;

/**
 * Fill missing dimension keys with zero.
 *
 * Used internally by {@linkcode QuantitySystem.factory} to expand a partial
 * dimension signature into a complete one.
 *
 * @typeParam Dims The system's base dimension tuple.
 * @typeParam D A partial mapping of dimension symbols to exponents.
 *
 * @example
 * ```ts
 * import type { WithDefaults } from "@isentropic/dim-quantity";
 *
 * // WithDefaults<["L", "M", "T"], { L: 2 }> resolves to { L: 2, M: 0, T: 0 }
 * ```
 */
export type WithDefaults<
  Dims extends readonly string[],
  D extends Partial<{ [K in Dims[number]]: Exp }>,
> = Simplify<{ [K in Dims[number]]: K extends keyof D ? D[K] : 0 }>;

/**
 * Multiply two dimension signatures by adding their exponents element-wise.
 *
 * This is the type-level counterpart of {@linkcode multiply} from
 * `@isentropic/dim-quantity/ops`.
 *
 * @typeParam A The left dimension signature.
 * @typeParam B The right dimension signature.
 *
 * @example
 * ```ts
 * import type { MulDim } from "@isentropic/dim-quantity";
 *
 * // length * time⁻¹ * time = length
 * // MulDim<{ L: 1, T: -1 }, { L: 0, T: 1 }> resolves to { L: 1, T: 0 }
 * ```
 */
export type MulDim<
  A extends Record<string, Exp>,
  B extends Record<string, Exp>,
> = Simplify<{ [K in keyof A & keyof B]: AddExp<A[K] & Exp, B[K] & Exp> }>;

/**
 * Divide two dimension signatures by subtracting their exponents element-wise.
 *
 * This is the type-level counterpart of {@linkcode divide} from
 * `@isentropic/dim-quantity/ops`.
 *
 * @typeParam A The numerator dimension signature.
 * @typeParam B The denominator dimension signature.
 *
 * @example
 * ```ts
 * import type { DivDim } from "@isentropic/dim-quantity";
 *
 * // length / time = velocity
 * // DivDim<{ L: 1, T: 0 }, { L: 0, T: 1 }> resolves to { L: 1, T: -1 }
 * ```
 */
export type DivDim<
  A extends Record<string, Exp>,
  B extends Record<string, Exp>,
> = Simplify<{ [K in keyof A & keyof B]: SubExp<A[K] & Exp, B[K] & Exp> }>;
