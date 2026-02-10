/**
 * SI prefix scale constants.
 *
 * All 24 official SI prefixes from quetta (10³⁰) to quecto (10⁻³⁰).
 *
 * @example
 * ```ts
 * import { meter } from "@isentropic/dim-si/length";
 * import { KILO, MILLI } from "@isentropic/dim-si/prefixes";
 *
 * const kilometer = meter.scaled(KILO);
 * const millimeter = meter.scaled(MILLI);
 * ```
 *
 * @module
 */

// Large prefixes

/** Quetta (Q) — 10³⁰. */
export const QUETTA = 1e30;

/** Ronna (R) — 10²⁷. */
export const RONNA = 1e27;

/** Yotta (Y) — 10²⁴. */
export const YOTTA = 1e24;

/** Zetta (Z) — 10²¹. */
export const ZETTA = 1e21;

/** Exa (E) — 10¹⁸. */
export const EXA = 1e18;

/** Peta (P) — 10¹⁵. */
export const PETA = 1e15;

/** Tera (T) — 10¹². */
export const TERA = 1e12;

/** Giga (G) — 10⁹. */
export const GIGA = 1e9;

/** Mega (M) — 10⁶. */
export const MEGA = 1e6;

/** Kilo (k) — 10³. */
export const KILO = 1e3;

/** Hecto (h) — 10². */
export const HECTO = 1e2;

/** Deca (da) — 10¹. */
export const DECA = 1e1;

// Small prefixes

/** Deci (d) — 10⁻¹. */
export const DECI = 1e-1;

/** Centi (c) — 10⁻². */
export const CENTI = 1e-2;

/** Milli (m) — 10⁻³. */
export const MILLI = 1e-3;

/** Micro (μ) — 10⁻⁶. */
export const MICRO = 1e-6;

/** Nano (n) — 10⁻⁹. */
export const NANO = 1e-9;

/** Pico (p) — 10⁻¹². */
export const PICO = 1e-12;

/** Femto (f) — 10⁻¹⁵. */
export const FEMTO = 1e-15;

/** Atto (a) — 10⁻¹⁸. */
export const ATTO = 1e-18;

/** Zepto (z) — 10⁻²¹. */
export const ZEPTO = 1e-21;

/** Yocto (y) — 10⁻²⁴. */
export const YOCTO = 1e-24;

/** Ronto (r) — 10⁻²⁷. */
export const RONTO = 1e-27;

/** Quecto (q) — 10⁻³⁰. */
export const QUECTO = 1e-30;
