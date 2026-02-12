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

import type { Current } from "@isentropic/dim-isq";
import { current } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

export type { Current } from "@isentropic/dim-isq";

/** Ampere (A) — SI unit of electric current. */
export const ampere: BaseUnit<Current> = si.unit(current);

/** Milliampere (mA) — 10⁻³ amperes. */
export const milliampere: ScaledUnit<Current> = ampere.scaled(MILLI);

/** Microampere (μA) — 10⁻⁶ amperes. */
export const microampere: ScaledUnit<Current> = ampere.scaled(MICRO);
