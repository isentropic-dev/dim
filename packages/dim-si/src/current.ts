/**
 * Electric current units (I).
 *
 * SI base unit: ampere (A).
 *
 * @example Converting milliamperes to amperes
 * ```ts
 * import { ampere, milliampere } from "@isentropic/dim-si/current";
 * import { valueIn } from "@isentropic/dim-si/ops";
 *
 * const draw = milliampere(500);
 * valueIn(draw, ampere);  // 0.5
 * ```
 *
 * @module
 */

import type { Current as CurrentDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { current } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

/** An SI current quantity. */
export type Current = Linear<CurrentDim, Si>;

/** Ampere (A) — SI unit of electric current. */
export const ampere: BaseUnit<CurrentDim> = si.unit(current);

/** Milliampere (mA) — 10⁻³ amperes. */
export const milliampere: ScaledUnit<CurrentDim> = ampere.scaled(MILLI);

/** Microampere (μA) — 10⁻⁶ amperes. */
export const microampere: ScaledUnit<CurrentDim> = ampere.scaled(MICRO);
