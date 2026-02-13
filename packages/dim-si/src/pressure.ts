/**
 * Pressure units (M·L⁻¹·T⁻²).
 *
 * SI unit: pascal (Pa).
 *
 * @example Converting between pressure units
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

import type { Pressure as PressureDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { pressure } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { MILLI } from "./prefixes.ts";

/** An SI pressure quantity. */
export type Pressure = Linear<PressureDim, Si>;

/** Pascal (Pa) — SI unit of pressure. */
export const pascal: BaseUnit<PressureDim> = si.unit(pressure);

/** Bar — 100000 pascals. */
export const bar: ScaledUnit<PressureDim> = pascal.scaled(100000);

/** Millibar (mbar) — 100 pascals. */
export const millibar: ScaledUnit<PressureDim> = bar.scaled(MILLI);
