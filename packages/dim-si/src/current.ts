/**
 * Electric current units (I).
 *
 * SI base unit: ampere (A).
 *
 * @module
 */

import type { Current } from "@isentropic/dim-isq";
import { current } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./system.ts";
import { si } from "./system.ts";
import { MICRO, MILLI } from "./prefixes.ts";

export type { Current } from "@isentropic/dim-isq";

/** Ampere (A) — SI unit of electric current. */
export const ampere: BaseUnit<Current> = si.unit(current);

/** Milliampere (mA) — 10⁻³ amperes. */
export const milliampere: ScaledUnit<Current> = ampere.scaled(MILLI);

/** Microampere (μA) — 10⁻⁶ amperes. */
export const microampere: ScaledUnit<Current> = ampere.scaled(MICRO);
