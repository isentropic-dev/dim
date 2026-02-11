/**
 * Pressure units (M·L⁻¹·T⁻²).
 *
 * SI unit: pascal (Pa).
 *
 * @example
 * ```ts
 * import { bar, millibar, pascal } from "@isentropic/dim-si/pressure";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const atm = pascal(101325);
 * valueIn(atm, bar);      // 1.01325
 * valueIn(atm, millibar); // 1013.25
 * ```
 *
 * @module
 */

import type { Pressure } from "@isentropic/dim-isq";
import { pressure } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { MILLI } from "./prefixes.ts";

export type { Pressure } from "@isentropic/dim-isq";

/** Pascal (Pa) — SI unit of pressure. */
export const pascal: BaseUnit<Pressure> = si.unit(pressure);

/** Bar — 100000 pascals. */
export const bar: ScaledUnit<Pressure> = pascal.scaled(100000);

/** Millibar (mbar) — 100 pascals. */
export const millibar: ScaledUnit<Pressure> = bar.scaled(MILLI);
