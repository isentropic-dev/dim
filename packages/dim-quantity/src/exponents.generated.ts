/**
 * Type-level integer arithmetic for dimension exponents.
 * Supports the range [-6, 6]. Operations outside this range resolve to `never`.
 *
 * THIS FILE IS GENERATED. DO NOT EDIT DIRECTLY.
 * Run `deno task generate:exponents` to regenerate.
 */

/** Valid exponent values. */
export type Exp = -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Negate an exponent. */
export type Negate<A extends Exp> = NegateExp[A];

/** Add two exponents. */
export type AddExp<A extends Exp, B extends Exp> = AddTable[A][B];

/** Subtract two exponents. */
export type SubExp<A extends Exp, B extends Exp> = AddExp<A, Negate<B>>;

// Lookup tables for type-level arithmetic

type NegateExp = {
  [-6]: 6;
  [-5]: 5;
  [-4]: 4;
  [-3]: 3;
  [-2]: 2;
  [-1]: 1;
  [0]: 0;
  [1]: -1;
  [2]: -2;
  [3]: -3;
  [4]: -4;
  [5]: -5;
  [6]: -6;
};

type AddTable = {
  [-6]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: never;
    [-1]: never;
    [0]: -6;
    [1]: -5;
    [2]: -4;
    [3]: -3;
    [4]: -2;
    [5]: -1;
    [6]: 0;
  };
  [-5]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: never;
    [-1]: -6;
    [0]: -5;
    [1]: -4;
    [2]: -3;
    [3]: -2;
    [4]: -1;
    [5]: 0;
    [6]: 1;
  };
  [-4]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: -6;
    [-1]: -5;
    [0]: -4;
    [1]: -3;
    [2]: -2;
    [3]: -1;
    [4]: 0;
    [5]: 1;
    [6]: 2;
  };
  [-3]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: -6;
    [-2]: -5;
    [-1]: -4;
    [0]: -3;
    [1]: -2;
    [2]: -1;
    [3]: 0;
    [4]: 1;
    [5]: 2;
    [6]: 3;
  };
  [-2]: {
    [-6]: never;
    [-5]: never;
    [-4]: -6;
    [-3]: -5;
    [-2]: -4;
    [-1]: -3;
    [0]: -2;
    [1]: -1;
    [2]: 0;
    [3]: 1;
    [4]: 2;
    [5]: 3;
    [6]: 4;
  };
  [-1]: {
    [-6]: never;
    [-5]: -6;
    [-4]: -5;
    [-3]: -4;
    [-2]: -3;
    [-1]: -2;
    [0]: -1;
    [1]: 0;
    [2]: 1;
    [3]: 2;
    [4]: 3;
    [5]: 4;
    [6]: 5;
  };
  [0]: {
    [-6]: -6;
    [-5]: -5;
    [-4]: -4;
    [-3]: -3;
    [-2]: -2;
    [-1]: -1;
    [0]: 0;
    [1]: 1;
    [2]: 2;
    [3]: 3;
    [4]: 4;
    [5]: 5;
    [6]: 6;
  };
  [1]: {
    [-6]: -5;
    [-5]: -4;
    [-4]: -3;
    [-3]: -2;
    [-2]: -1;
    [-1]: 0;
    [0]: 1;
    [1]: 2;
    [2]: 3;
    [3]: 4;
    [4]: 5;
    [5]: 6;
    [6]: never;
  };
  [2]: {
    [-6]: -4;
    [-5]: -3;
    [-4]: -2;
    [-3]: -1;
    [-2]: 0;
    [-1]: 1;
    [0]: 2;
    [1]: 3;
    [2]: 4;
    [3]: 5;
    [4]: 6;
    [5]: never;
    [6]: never;
  };
  [3]: {
    [-6]: -3;
    [-5]: -2;
    [-4]: -1;
    [-3]: 0;
    [-2]: 1;
    [-1]: 2;
    [0]: 3;
    [1]: 4;
    [2]: 5;
    [3]: 6;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [4]: {
    [-6]: -2;
    [-5]: -1;
    [-4]: 0;
    [-3]: 1;
    [-2]: 2;
    [-1]: 3;
    [0]: 4;
    [1]: 5;
    [2]: 6;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [5]: {
    [-6]: -1;
    [-5]: 0;
    [-4]: 1;
    [-3]: 2;
    [-2]: 3;
    [-1]: 4;
    [0]: 5;
    [1]: 6;
    [2]: never;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [6]: {
    [-6]: 0;
    [-5]: 1;
    [-4]: 2;
    [-3]: 3;
    [-2]: 4;
    [-1]: 5;
    [0]: 6;
    [1]: never;
    [2]: never;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
};
