import type { AddExp, Exp, SubExp } from "./exponents.generated.ts";

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

/** Fill missing dimension keys with zero. */
export type WithDefaults<
  Dims extends readonly string[],
  D extends Partial<{ [K in Dims[number]]: Exp }>,
> = Simplify<{ [K in Dims[number]]: K extends keyof D ? D[K] : 0 }>;

/** Multiply dimensions: add exponents element-wise. */
export type MulDim<
  A extends Record<string, Exp>,
  B extends Record<string, Exp>,
> = Simplify<{ [K in keyof A & keyof B]: AddExp<A[K] & Exp, B[K] & Exp> }>;

/** Divide dimensions: subtract exponents element-wise. */
export type DivDim<
  A extends Record<string, Exp>,
  B extends Record<string, Exp>,
> = Simplify<{ [K in keyof A & keyof B]: SubExp<A[K] & Exp, B[K] & Exp> }>;
