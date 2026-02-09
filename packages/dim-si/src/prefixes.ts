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
export const QUETTA = 1e30;
export const RONNA = 1e27;
export const YOTTA = 1e24;
export const ZETTA = 1e21;
export const EXA = 1e18;
export const PETA = 1e15;
export const TERA = 1e12;
export const GIGA = 1e9;
export const MEGA = 1e6;
export const KILO = 1e3;
export const HECTO = 1e2;
export const DECA = 1e1;

// Small prefixes
export const DECI = 1e-1;
export const CENTI = 1e-2;
export const MILLI = 1e-3;
export const MICRO = 1e-6;
export const NANO = 1e-9;
export const PICO = 1e-12;
export const FEMTO = 1e-15;
export const ATTO = 1e-18;
export const ZEPTO = 1e-21;
export const YOCTO = 1e-24;
export const RONTO = 1e-27;
export const QUECTO = 1e-30;
